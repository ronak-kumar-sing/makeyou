import * as React from 'react';
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'none';
type ElementType = 'section' | 'article' | 'div' | 'aside' | 'main';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Unique identifier for the section (used for navigation)
   */
  id: string;

  /**
   * Whether to animate the section when it enters the viewport
   * @default true
   */
  animateOnScroll?: boolean;

  /**
   * Type of animation to apply
   * @default 'fade-in'
   */
  animationType?: AnimationType;

  /**
   * Delay before animation starts (in milliseconds)
   * @default 0
   */
  animationDelay?: number;

  /**
   * Intersection Observer threshold (0-1)
   * @default 0.1
   */
  threshold?: number;

  /**
   * Root margin for Intersection Observer
   * @default '0px'
   */
  rootMargin?: string;

  /**
   * HTML element type to render
   * @default 'section'
   */
  as?: ElementType;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Child elements
   */
  children: React.ReactNode;
}

const animationClasses: Record<AnimationType, string> = {
  'fade-in': 'animate-fade-in',
  'slide-up': 'animate-slide-up',
  'slide-down': 'animate-slide-down',
  'slide-left': 'animate-slide-left',
  'slide-right': 'animate-slide-right',
  'scale': 'animate-scale',
  'none': '',
};

/**
 * Section component that wraps page sections with optional scroll animations
 * Uses Intersection Observer for performance-optimized scroll detection
 * Respects prefers-reduced-motion user preference
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      animateOnScroll = true,
      animationType = 'fade-in',
      animationDelay = 0,
      threshold = 0.1,
      rootMargin = '0px',
      as: Component = 'section',
      className,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const { ref: observerRef, isIntersecting } = useIntersectionObserver({
      threshold,
      rootMargin,
      triggerOnce: true,
      delay: animationDelay,
    });

    // Merge refs if forwardedRef is provided
    const mergedRef = React.useCallback(
      (node: HTMLElement | null) => {
        // Set the observer ref
        (observerRef as React.MutableRefObject<HTMLElement | null>).current = node;

        // Set the forwarded ref if provided
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [observerRef, forwardedRef]
    );

    const animationClass = animateOnScroll ? animationClasses[animationType] : '';

    // Apply animation class only when intersecting
    const shouldAnimate = animateOnScroll && isIntersecting;

    return (
      <Component
        ref={mergedRef}
        id={id}
        className={cn(
          // Base styles
          'relative',
          // Animation classes (only applied when intersecting)
          shouldAnimate && animationClass,
          // Initial state (hidden until intersecting)
          animateOnScroll && !isIntersecting && 'opacity-0',
          // Custom classes
          className
        )}
        // Respect prefers-reduced-motion
        style={{
          animationDelay: shouldAnimate && animationDelay > 0 ? `${animationDelay}ms` : undefined,
        }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';
