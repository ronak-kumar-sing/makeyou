import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import ClickSpark from './ClickSpark';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[#4C8EFF] text-white hover:bg-[#3d7ae6] focus-visible:ring-[#4C8EFF] active:scale-95',
        secondary:
          'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-400 active:scale-95',
        outline:
          'border-2 border-[#4C8EFF] text-[#4C8EFF] hover:bg-[#4C8EFF] hover:text-white focus-visible:ring-[#4C8EFF] active:scale-95',
        ghost:
          'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-400 active:scale-95',
      },
      size: {
        sm: 'h-9 px-4 py-2 text-sm min-h-[36px]',
        md: 'h-11 px-6 py-3 text-base min-h-[44px]',
        lg: 'h-14 px-8 py-4 text-lg min-h-[56px]',
      },
      animation: {
        none: '',
        subtle: 'hover:shadow-md',
        scale: 'hover:scale-105',
        shine:
          'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:translate-x-full before:transition-transform before:duration-700',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      animation: 'subtle',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      fullWidth,
      asChild = false,
      loading = false,
      icon,
      iconPosition = 'left',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </>
    );

    if (asChild) {
      // For polymorphic rendering (e.g., as a Link component)
      return (
        <span
          className={cn(
            buttonVariants({ variant, size, animation, fullWidth }),
            className
          )}
        >
          {content}
        </span>
      );
    }

    return (
      <ClickSpark
        sparkColor="#4C8EFF"
        sparkSize={12}
        sparkRadius={20}
        sparkCount={8}
        duration={500}
      >
        <button
          className={cn(
            buttonVariants({ variant, size, animation, fullWidth }),
            className
          )}
          ref={ref}
          disabled={isDisabled}
          aria-busy={loading}
          {...props}
        >
          {content}
        </button>
      </ClickSpark>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
