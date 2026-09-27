import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      href,
      target,
      rel,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99] cursor-pointer';

    const variantClasses = {
      primary:
        'bg-nabat-primary-500 hover:bg-nabat-primary-600 active:bg-nabat-primary-700 text-white shadow-nabat-sm hover:shadow-nabat-md focus-visible:ring-nabat-primary-500 border border-transparent',
      secondary:
        'bg-white hover:bg-nabat-primary-50 active:bg-nabat-primary-100 text-nabat-primary-700 border-2 border-nabat-primary-500 shadow-xs hover:shadow-nabat-sm focus-visible:ring-nabat-primary-500',
      ghost:
        'bg-transparent hover:bg-nabat-neutral-100 active:bg-nabat-neutral-200 text-nabat-neutral-700 hover:text-nabat-neutral-900 focus-visible:ring-nabat-primary-500 border border-transparent',
      outline:
        'bg-transparent hover:bg-white text-nabat-neutral-700 border border-nabat-neutral-300 hover:border-nabat-neutral-400 focus-visible:ring-nabat-primary-500 shadow-xs',
    };

    const sizeClasses = {
      sm: 'px-3.5 py-1.5 text-xs sm:text-sm rounded-nabat-sm gap-1.5',
      md: 'px-5 py-2.5 text-sm sm:text-base rounded-nabat-md gap-2',
      lg: 'px-7 py-3.5 text-base sm:text-lg rounded-nabat-lg font-semibold gap-2.5',
    };

    const combinedClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    const content = (
      <>
        {isLoading && (
          <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin flex-shrink-0" />
        )}
        {!isLoading && leftIcon && (
          <span className="inline-flex items-center flex-shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {rightIcon && (
          <span className="inline-flex items-center flex-shrink-0">{rightIcon}</span>
        )}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          className={combinedClasses}
          target={target}
          rel={rel}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClasses}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
