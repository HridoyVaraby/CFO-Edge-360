import { useState, useEffect, useRef } from 'react';

interface UseLazyImageOptions {
  rootMargin?: string;
  threshold?: number;
  priority?: boolean;
}

interface UseLazyImageReturn {
  isInView: boolean;
  isLoaded: boolean;
  hasError: boolean;
  imgRef: React.RefObject<HTMLElement>;
  handleLoad: () => void;
  handleError: () => void;
}

export const useLazyImage = (options: UseLazyImageOptions = {}): UseLazyImageReturn => {
  const {
    rootMargin = '50px',
    threshold = 0.1,
    priority = false
  } = options;

  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (priority) return; // Skip observer for priority images

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin,
        threshold
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return {
    isInView,
    isLoaded,
    hasError,
    imgRef,
    handleLoad,
    handleError
  };
};