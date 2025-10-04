import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, 
  RefreshCw, 
  Home, 
  ArrowLeft, 
  Wifi, 
  Server, 
  Clock,
  AlertTriangle 
} from 'lucide-react';

interface ErrorDisplayProps {
  error: string | Error;
  onRetry?: () => void;
  isRetrying?: boolean;
  retryCount?: number;
  maxRetries?: number;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'card' | 'inline' | 'fullscreen';
}

// Error type detection
const getErrorType = (error: string | Error): {
  type: 'network' | 'timeout' | 'server' | 'notfound' | 'generic';
  icon: React.ComponentType<any>;
  title: string;
  suggestion: string;
} => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const lowerMessage = errorMessage.toLowerCase();

  if (lowerMessage.includes('404') || lowerMessage.includes('not found')) {
    return {
      type: 'notfound',
      icon: AlertCircle,
      title: 'Content Not Found',
      suggestion: 'The content you\'re looking for might have been moved or deleted.',
    };
  }

  if (lowerMessage.includes('timeout') || lowerMessage.includes('aborted')) {
    return {
      type: 'timeout',
      icon: Clock,
      title: 'Request Timeout',
      suggestion: 'The request took too long to complete. Please check your connection and try again.',
    };
  }

  if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
    return {
      type: 'network',
      icon: Wifi,
      title: 'Connection Problem',
      suggestion: 'Please check your internet connection and try again.',
    };
  }

  if (lowerMessage.includes('500') || lowerMessage.includes('502') || lowerMessage.includes('503')) {
    return {
      type: 'server',
      icon: Server,
      title: 'Server Error',
      suggestion: 'Our servers are experiencing issues. Please try again in a few moments.',
    };
  }

  return {
    type: 'generic',
    icon: AlertTriangle,
    title: 'Something Went Wrong',
    suggestion: 'An unexpected error occurred. Please try again.',
  };
};

// Size configurations
const sizeConfig = {
  small: {
    container: 'p-4',
    icon: 'h-8 w-8',
    title: 'text-lg',
    message: 'text-sm',
    button: 'px-4 py-2 text-sm',
  },
  medium: {
    container: 'p-6',
    icon: 'h-12 w-12',
    title: 'text-xl',
    message: 'text-base',
    button: 'px-6 py-3 text-sm',
  },
  large: {
    container: 'p-8',
    icon: 'h-16 w-16',
    title: 'text-2xl',
    message: 'text-lg',
    button: 'px-8 py-4 text-base',
  },
};

// Variant configurations
const variantConfig = {
  card: 'bg-white rounded-xl shadow-lg border border-red-200',
  inline: 'bg-red-50 rounded-lg border border-red-200',
  fullscreen: 'min-h-[400px] bg-white rounded-xl shadow-lg border border-red-200 flex items-center justify-center',
};

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  isRetrying = false,
  retryCount = 0,
  maxRetries = 3,
  showBackButton = true,
  showHomeButton = true,
  className = '',
  size = 'medium',
  variant = 'card',
}) => {
  const errorInfo = getErrorType(error);
  const sizes = sizeConfig[size];
  const variantClass = variantConfig[variant];
  const Icon = errorInfo.icon;

  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <div className={`${variantClass} ${sizes.container} text-center animate-fade-in ${className}`}>
      {/* Error Icon */}
      <Icon className={`${sizes.icon} text-red-500 mx-auto mb-4`} />
      
      {/* Error Title */}
      <h3 className={`${sizes.title} font-bold font-serif text-gray-900 mb-2`}>
        {errorInfo.title}
      </h3>
      
      {/* Error Message */}
      <p className={`${sizes.message} text-gray-600 mb-4 leading-relaxed`}>
        {errorInfo.suggestion}
      </p>

      {/* Technical Error Details (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mb-6 text-left">
          <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 mb-2">
            Technical Details (Development)
          </summary>
          <div className="bg-gray-50 rounded-lg p-4 text-xs font-mono text-gray-800 overflow-auto max-h-32">
            {errorMessage}
          </div>
        </details>
      )}

      {/* Retry Information */}
      {onRetry && retryCount > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            Retry attempt {retryCount} of {maxRetries}
          </p>
        </div>
      )}

      {/* Retry Status */}
      {isRetrying && (
        <div className="mb-6 flex items-center justify-center gap-2 text-blue-600">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">Retrying...</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {/* Retry Button */}
        {onRetry && !isRetrying && (
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className={`${sizes.button} inline-flex items-center gap-2 bg-blue-900 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}

        {/* Back Button */}
        {showBackButton && (
          <Link
            to="/posts"
            className={`${sizes.button} inline-flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        )}

        {/* Home Button */}
        {showHomeButton && (
          <Link
            to="/"
            className={`${sizes.button} inline-flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-200`}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        )}
      </div>

      {/* Additional Help Text */}
      {errorInfo.type === 'network' && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>Troubleshooting tips:</strong>
          </p>
          <ul className="text-sm text-yellow-700 mt-2 space-y-1 text-left">
            <li>• Check your internet connection</li>
            <li>• Disable any ad blockers or VPN</li>
            <li>• Try refreshing the page</li>
            <li>• Clear your browser cache</li>
          </ul>
        </div>
      )}

      {errorInfo.type === 'server' && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            We're aware of this issue and working to fix it. Please try again in a few minutes.
          </p>
        </div>
      )}
    </div>
  );
};

export default ErrorDisplay;

// Specialized error components for common use cases

export const NetworkErrorDisplay: React.FC<Omit<ErrorDisplayProps, 'error'>> = (props) => (
  <ErrorDisplay
    error="Network connection failed. Please check your internet connection."
    {...props}
  />
);

export const NotFoundErrorDisplay: React.FC<Omit<ErrorDisplayProps, 'error'>> = (props) => (
  <ErrorDisplay
    error="The requested content could not be found."
    showBackButton={true}
    showHomeButton={true}
    {...props}
  />
);

export const ServerErrorDisplay: React.FC<Omit<ErrorDisplayProps, 'error'>> = (props) => (
  <ErrorDisplay
    error="Server is temporarily unavailable. Please try again later."
    {...props}
  />
);

export const TimeoutErrorDisplay: React.FC<Omit<ErrorDisplayProps, 'error'>> = (props) => (
  <ErrorDisplay
    error="Request timed out. Please check your connection and try again."
    {...props}
  />
);