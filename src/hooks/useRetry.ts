import { useState, useCallback, useRef } from 'react';

interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  onRetry?: (attempt: number, error: Error) => void;
  onMaxAttemptsReached?: (error: Error) => void;
}

interface RetryState {
  isRetrying: boolean;
  attemptCount: number;
  lastError: Error | null;
}

interface RetryResult<T> {
  execute: () => Promise<T | null>;
  retry: () => Promise<T | null>;
  reset: () => void;
  state: RetryState;
}

/**
 * Custom hook for handling retry logic with exponential backoff
 * @param asyncFunction - The async function to retry
 * @param options - Retry configuration options
 * @returns Object with execute, retry, reset functions and current state
 */
export function useRetry<T>(
  asyncFunction: () => Promise<T>,
  options: RetryOptions = {}
): RetryResult<T> {
  const {
    maxAttempts = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    backoffFactor = 2,
    onRetry,
    onMaxAttemptsReached,
  } = options;

  const [state, setState] = useState<RetryState>({
    isRetrying: false,
    attemptCount: 0,
    lastError: null,
  });

  // Use ref to store the latest function to avoid stale closures
  const asyncFunctionRef = useRef(asyncFunction);
  asyncFunctionRef.current = asyncFunction;

  const delay = useCallback((ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }, []);

  const calculateDelay = useCallback((attempt: number): number => {
    const exponentialDelay = initialDelay * Math.pow(backoffFactor, attempt);
    return Math.min(exponentialDelay, maxDelay);
  }, [initialDelay, backoffFactor, maxDelay]);

  const executeWithRetry = useCallback(async (isRetry = false): Promise<T | null> => {
    // If this is a retry, increment attempt count
    if (isRetry) {
      setState(prev => ({
        ...prev,
        attemptCount: prev.attemptCount + 1,
        isRetrying: true,
      }));
    } else {
      // Reset state for new execution
      setState({
        isRetrying: false,
        attemptCount: 0,
        lastError: null,
      });
    }

    let currentAttempt = isRetry ? state.attemptCount : 0;

    while (currentAttempt < maxAttempts) {
      try {
        const result = await asyncFunctionRef.current();
        
        // Success - reset state
        setState({
          isRetrying: false,
          attemptCount: 0,
          lastError: null,
        });
        
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        
        currentAttempt++;
        
        setState(prev => ({
          ...prev,
          attemptCount: currentAttempt,
          lastError: err,
          isRetrying: currentAttempt < maxAttempts,
        }));

        // If we've reached max attempts, stop retrying
        if (currentAttempt >= maxAttempts) {
          setState(prev => ({
            ...prev,
            isRetrying: false,
          }));
          
          if (onMaxAttemptsReached) {
            onMaxAttemptsReached(err);
          }
          
          throw err;
        }

        // Call retry callback if provided
        if (onRetry) {
          onRetry(currentAttempt, err);
        }

        // Wait before next attempt with exponential backoff
        const delayMs = calculateDelay(currentAttempt - 1);
        await delay(delayMs);
      }
    }

    return null;
  }, [maxAttempts, onRetry, onMaxAttemptsReached, calculateDelay, delay, state.attemptCount]);

  const execute = useCallback((): Promise<T | null> => {
    return executeWithRetry(false);
  }, [executeWithRetry]);

  const retry = useCallback((): Promise<T | null> => {
    return executeWithRetry(true);
  }, [executeWithRetry]);

  const reset = useCallback(() => {
    setState({
      isRetrying: false,
      attemptCount: 0,
      lastError: null,
    });
  }, []);

  return {
    execute,
    retry,
    reset,
    state,
  };
}

/**
 * Hook for automatic retry with configurable conditions
 * @param asyncFunction - The async function to retry
 * @param shouldRetry - Function to determine if error should trigger retry
 * @param options - Retry configuration options
 */
export function useAutoRetry<T>(
  asyncFunction: () => Promise<T>,
  shouldRetry: (error: Error) => boolean = () => true,
  options: RetryOptions = {}
): RetryResult<T> {
  const retryLogic = useRetry(asyncFunction, options);

  const executeWithAutoRetry = useCallback(async (): Promise<T | null> => {
    try {
      return await retryLogic.execute();
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      
      // Only retry if shouldRetry returns true
      if (shouldRetry(err) && retryLogic.state.attemptCount < (options.maxAttempts || 3)) {
        return await retryLogic.retry();
      }
      
      throw err;
    }
  }, [retryLogic, shouldRetry, options.maxAttempts]);

  return {
    ...retryLogic,
    execute: executeWithAutoRetry,
  };
}

/**
 * Hook for retry with user-friendly error messages
 * @param asyncFunction - The async function to retry
 * @param options - Retry configuration options
 */
export function useRetryWithMessages<T>(
  asyncFunction: () => Promise<T>,
  options: RetryOptions & {
    retryMessage?: (attempt: number) => string;
    maxAttemptsMessage?: string;
  } = {}
): RetryResult<T> & {
  getMessage: () => string | null;
} {
  const {
    retryMessage = (attempt: number) => `Retrying... (attempt ${attempt})`,
    maxAttemptsMessage = 'Maximum retry attempts reached. Please try again later.',
    ...retryOptions
  } = options;

  const [message, setMessage] = useState<string | null>(null);

  const retryLogic = useRetry(asyncFunction, {
    ...retryOptions,
    onRetry: (attempt, error) => {
      setMessage(retryMessage(attempt));
      retryOptions.onRetry?.(attempt, error);
    },
    onMaxAttemptsReached: (error) => {
      setMessage(maxAttemptsMessage);
      retryOptions.onMaxAttemptsReached?.(error);
    },
  });

  const getMessage = useCallback(() => message, [message]);

  // Clear message on successful execution
  const execute = useCallback(async (): Promise<T | null> => {
    setMessage(null);
    return await retryLogic.execute();
  }, [retryLogic]);

  const retry = useCallback(async (): Promise<T | null> => {
    setMessage(null);
    return await retryLogic.retry();
  }, [retryLogic]);

  const reset = useCallback(() => {
    setMessage(null);
    retryLogic.reset();
  }, [retryLogic]);

  return {
    ...retryLogic,
    execute,
    retry,
    reset,
    getMessage,
  };
}

/**
 * Utility function to determine if an error should trigger a retry
 * @param error - The error to check
 * @returns boolean indicating if retry should be attempted
 */
export function shouldRetryError(error: Error): boolean {
  // Don't retry for client errors (4xx) except for specific cases
  if (error.message.includes('404') || error.message.includes('401') || error.message.includes('403')) {
    return false;
  }

  // Retry for network errors, timeouts, and server errors (5xx)
  if (
    error.message.includes('timeout') ||
    error.message.includes('network') ||
    error.message.includes('500') ||
    error.message.includes('502') ||
    error.message.includes('503') ||
    error.message.includes('504') ||
    error.name === 'AbortError' ||
    error.name === 'NetworkError'
  ) {
    return true;
  }

  return false;
}