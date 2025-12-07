import * as React from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

export interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  /**
   * Alternative text for the image (required for accessibility)
   */
  alt: string;

  /**
   * Whether this image is above the fold and should be loaded with priority
   * @default false
   */
  priority?: boolean;

  /**
   * Image quality (1-100)
   * @default 85
   */
  quality?: number;

  /**
   * Responsive sizes attribute for different breakpoints
   * @default '100vw'
   */
  sizes?: string;

  /**
   * Whether to show a blur placeholder while loading
   * @default true
   */
  showBlurPlaceholder?: boolean;

  /**
   * Custom blur data URL (base64 encoded)
   */
  blurDataURL?: string;

  /**
   * Object fit style
   * @default 'cover'
   */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

  /**
   * Object position style
   * @default 'center'
   */
  objectPosition?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Container class name (for wrapper div when using fill)
   */
  containerClassName?: string;
}

/**
 * Optimized image component wrapper around next/image
 * Provides sensible defaults for performance and accessibility
 *
 * @example
 * ```tsx
 * // Standard image
 * <OptimizedImage
 *   src="/hero.jpg"
 *   alt="Hero illustration"
 *   width={1200}
 *   height={675}
 *   priority
 * />
 *
 * // Fill container
 * <OptimizedImage
 *   src="/background.jpg"
 *   alt="Background"
 *   fill
 *   objectFit="cover"
 * />
 * ```
 */
export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      alt,
      priority = false,
      quality = 85,
      sizes,
      showBlurPlaceholder = true,
      blurDataURL,
      objectFit = 'cover',
      objectPosition = 'center',
      className,
      containerClassName,
      fill,
      ...props
    },
    ref
  ) => {
    // Validate alt text (empty string is valid for decorative images)
    if (alt === undefined || alt === null) {
      console.warn('OptimizedImage: alt prop is required. Use empty string ("") for decorative images.');
    }

    // Default responsive sizes based on common breakpoints
    const defaultSizes = fill
      ? '100vw'
      : sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';

    // Blur placeholder configuration
    const blurConfig = showBlurPlaceholder
      ? {
        placeholder: 'blur' as const,
        blurDataURL: blurDataURL || generateBlurDataURL(),
      }
      : {};

    // Image component props
    const imageProps: ImageProps = {
      alt,
      quality,
      sizes: defaultSizes,
      priority,
      fill,
      ...blurConfig,
      ...props,
      className: cn(
        // Base styles
        'transition-opacity duration-300',
        // Object fit and position (only when using fill)
        fill && `object-${objectFit}`,
        fill && objectPosition !== 'center' && `object-[${objectPosition}]`,
        className
      ),
    };

    // If using fill, wrap in a container
    if (fill) {
      return (
        <div className={cn('relative overflow-hidden', containerClassName)}>
          <Image {...imageProps} ref={ref as any} />
        </div>
      );
    }

    return <Image {...imageProps} ref={ref as any} />;
  }
);

OptimizedImage.displayName = 'OptimizedImage';

/**
 * Generate a simple blur data URL for placeholder
 * This is a minimal 1x1 pixel blur placeholder
 */
function generateBlurDataURL(): string {
  // A minimal 1x1 gray pixel as base64
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=';
}

/**
 * Helper function to generate a blur data URL from an image color
 * @param color - Hex color code (e.g., '#4C8EFF')
 */
export function generateColorBlurDataURL(color: string): string {
  const svg = `
    <svg width="1" height="1" xmlns="http://www.w3.org/2000/svg">
      <rect width="1" height="1" fill="${color}"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Predefined responsive sizes for common use cases
 */
export const responsiveSizes = {
  // Full width on all devices
  full: '100vw',

  // Hero images (full width on mobile, constrained on desktop)
  hero: '(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px',

  // Content images (full width on mobile, half on tablet, third on desktop)
  content: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',

  // Thumbnail images (small on all devices)
  thumbnail: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',

  // Card images (full width on mobile, half on tablet, third on desktop)
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',

  // Avatar images (small fixed size)
  avatar: '(max-width: 640px) 80px, 120px',
};

/**
 * Helper component for image with aspect ratio container
 */
export interface AspectRatioImageProps extends OptimizedImageProps {
  aspectRatio?: number; // e.g., 16/9, 4/3, 1
}

export const AspectRatioImage: React.FC<AspectRatioImageProps> = ({
  aspectRatio = 16 / 9,
  containerClassName,
  ...props
}) => {
  const paddingBottom = `${(1 / aspectRatio) * 100}%`;

  return (
    <div
      className={cn('relative w-full', containerClassName)}
      style={{ paddingBottom }}
    >
      <OptimizedImage {...props} fill className={cn('absolute inset-0', props.className)} />
    </div>
  );
};

AspectRatioImage.displayName = 'AspectRatioImage';
