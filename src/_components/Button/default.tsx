import React from 'react';
import {
  Button as ShadcnButton,
  ButtonProps as ShadcnButtonProps,
} from 'src/components/ui/button';
import { cn } from 'src/lib/utils';

interface DefaultButtonProps extends Omit<ShadcnButtonProps, 'type'> {
  buttonType?: 'primary' | 'secondary' | 'tertiary';
  customStyles?: {
    default?: string;
    hover?: string;
    pressed?: string;
    disabled?: string;
  };
}

const Default: React.FC<DefaultButtonProps> = ({
  children,
  buttonType = 'primary',
  customStyles,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = {
    primary: 'border-blue-500 bg-blue-500 text-white',
    secondary: 'border-gray-300 bg-white text-gray-700',
    tertiary: 'border-transparent bg-transparent text-blue-500',
  };

  const hoverStyles = {
    primary: 'hover:bg-blue-600',
    secondary: 'hover:bg-gray-100',
    tertiary: 'hover:bg-blue-50',
  };

  const pressedStyles = {
    primary: 'active:bg-blue-700',
    secondary: 'active:bg-gray-200',
    tertiary: 'active:bg-blue-100',
  };

  const disabledStyles = {
    primary: 'disabled:bg-blue-300',
    secondary: 'disabled:bg-gray-100',
    tertiary: 'disabled:text-gray-300',
  };

  return (
    <ShadcnButton
      className={cn(
        'border transition-colors',
        baseStyles[buttonType],
        !disabled && hoverStyles[buttonType],
        !disabled && pressedStyles[buttonType],
        disabled && disabledStyles[buttonType],
        disabled && 'cursor-not-allowed',
        customStyles?.default,
        !disabled && customStyles?.hover,
        !disabled && customStyles?.pressed,
        disabled && customStyles?.disabled,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};

export default Default;
