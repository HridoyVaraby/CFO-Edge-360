import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

// Default fallback UI component
const DefaultErrorFallback: React.FC<{
  error: Error | null;
  errorId: string;
  onRetry: () => void;
}> = ({ error, errorId, onRetry }) => (
  <div className="min-h-[400px] flex items-center justify-center p-8">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-red-200 p-8 text-center animate-fade-in">
      <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6" />
      
      <h2 className="text-2xl font-bold font-serif text-gray-900 mb-3">
        Something went wrong
      </h2>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        We encountered an unexpected error while loading this content. 
        This has been automatically reported to our team.
      </p>

      {/* Error details for development */}
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mb-6 text-left">
          <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 mb-2">
            Error Details (Development)
          </summary>
          <div className="bg-gray-50 rounded-lg p-4 text-xs font-mono text-gray-800 overflow-auto max-h-32">
            <div className="mb-2">
              <strong>Error:</strong> {error.message}
            </div>
            <div>
              <strong>Stack:</strong>
              <pre className="whitespace-pre-wrap mt-1">{error.stack}</pre>
            </div>
          </div>
        </details>
      )}

      {/* Error ID for support */}
      <div className="mb-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-500 mb-1">Error ID for support:</p>
        <code className="text-sm font-mono text-gray-700">{errorId}</code>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors duration-200"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        
        <Link
          to="/posts"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
      </div>
    </div>
  </div>
);

class BlogErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Generate a unique error ID for tracking
    const errorId = `blog-error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('BlogErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error info
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In a real application, you would send this to an error reporting service
    this.logErrorToService(error, errorInfo);
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // This would typically send to a service like Sentry, LogRocket, etc.
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: null, // Would be populated if user is logged in
    };

    // For now, just log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Report');
      console.error('Error Details:', errorReport);
      console.groupEnd();
    }

    // In production, send to error reporting service
    // Example: Sentry.captureException(error, { extra: errorReport });
  };

  private handleRetry = () => {
    // Reset error state to retry rendering
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: ''
    });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <DefaultErrorFallback
          error={this.state.error}
          errorId={this.state.errorId}
          onRetry={this.handleRetry}
        />
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default BlogErrorBoundary;

// Hook for functional components to trigger error boundary
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const throwError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return throwError;
};

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) => {
  const WrappedComponent = (props: P) => (
    <BlogErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </BlogErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};