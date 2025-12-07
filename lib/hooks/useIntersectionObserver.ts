import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

/**
 * Custom hook for triggering animations when elements enter the viewport
 * Uses Intersection Observer API for performance
 *
 * @param options - Configuration options for the observer
 * @returns ref to attach to element and isIntersecting state
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                setIsIntersecting(true);
                if (triggerOnce) {
                  setHasTriggered(true);
                }
              }, delay);
            } else {
              setIsIntersecting(true);
              if (triggerOnce) {
                setHasTriggered(true);
              }
            }
          } else if (!triggerOnce) {
            setIsIntersecting(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Cleanup: disconnect observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered]);

  return { ref: elementRef, isIntersecting };
}

/**
 * Hook for staggered animations on multiple elements
 * Returns an array of refs and their intersection states
 *
 * @param count - Number of elements to observe
 * @param options - Configuration options for the observer
 * @param staggerDelay - Delay between each element's animation (in ms)
 * @returns Array of refs and intersection states
 */
export function useStaggeredIntersectionObserver<T extends HTMLElement = HTMLElement>(
  count: number,
  options: UseIntersectionObserverOptions = {},
  staggerDelay: number = 100
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const elementRefs = useRef<(T | null)[]>(Array(count).fill(null));
  const [intersectingStates, setIntersectingStates] = useState<boolean[]>(
    Array(count).fill(false)
  );
  const [hasTriggered, setHasTriggered] = useState<boolean[]>(
    Array(count).fill(false)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    elementRefs.current.forEach((element, index) => {
      if (!element) return;

      // Skip if already triggered and triggerOnce is true
      if (triggerOnce && hasTriggered[index]) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const delay = index * staggerDelay;
              setTimeout(() => {
                setIntersectingStates((prev) => {
                  const newStates = [...prev];
                  newStates[index] = true;
                  return newStates;
                });
                if (triggerOnce) {
                  setHasTriggered((prev) => {
                    const newStates = [...prev];
                    newStates[index] = true;
                    return newStates;
                  });
                }
              }, delay);
            } else if (!triggerOnce) {
              setIntersectingStates((prev) => {
                const newStates = [...prev];
                newStates[index] = false;
                return newStates;
              });
            }
          });
        },
        {
          threshold,
          rootMargin,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    // Cleanup: disconnect all observers on unmount
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [threshold, rootMargin, triggerOnce, staggerDelay, hasTriggered]);

  const setRef = (index: number) => (element: T | null) => {
    elementRefs.current[index] = element;
  };

  return {
    setRef,
    intersectingStates,
  };
}
