import { FC } from 'react';

import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';
  size?: 'small' | 'regular';
  icon?: boolean;
  outline?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const Button: FC<Props> = ({
  children,
  variant = 'primary',
  size = 'regular',
  icon = false,
  outline = false,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
}) => (
  <button
    className={clsx(
      {
        'bg-gray-200 text-gray-900': variant === 'primary' && !outline,
        'bg-gray-300 text-gray-900': variant === 'secondary' && !outline,
        'bg-gray-400 text-gray-900': variant === 'tertiary' && !outline,
        'bg-gray-500 text-white': variant === 'warning' && !outline,
        'bg-red-600 text-white': variant === 'danger' && !outline,
        'border-3': outline,
        'border-gray-200 text-gray-200': variant === 'primary' && outline,
        'border-gray-300 text-gray-300': variant === 'secondary' && outline,
        'border-gray-400 text-gray-400': variant === 'tertiary' && outline,
        'border-gray-500 text-gray-500': variant === 'warning' && outline,
        'border-red-600 text-red-600': variant === 'danger' && outline,
        'cursor-pointer': !disabled,
        'cursor-not-allowed': disabled,
        'opacity-50': loading,
        'opacity-100': !loading,
      },
      {
        'hover:bg-gray-400 hover:text-gray-900': variant === 'primary',
        'hover:bg-gray-500 hover:text-white': variant === 'secondary',
        'hover:bg-gray-600 hover:text-white': variant === 'tertiary',
        'hover:bg-gray-700 hover:text-white': variant === 'warning',
        'hover:bg-red-700 hover:text-white': variant === 'danger',
      },
      {
        'px-3 py-2': size === 'regular',
        'px-1 py-1': size === 'small',
      },
      {
        'flex items-center justify-center border-0': icon,
      },
      'transition-all duration-200 ease-in-out rounded border'
    )}
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
  >
    {loading ? 'Loading...' : children}
  </button>
);
