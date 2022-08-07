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
        'bg-purple-600 border-purple-600 text-white': variant === 'primary' && !outline,
        'bg-gray-700 border-gray-700 text-white': variant === 'secondary' && !outline,
        'bg-gray-400 border-gray-400 text-gray-900': variant === 'tertiary' && !outline,
        'bg-yellow-500 border-yellow-500 text-white': variant === 'warning' && !outline,
        'bg-red-600 border-red-600 text-white': variant === 'danger' && !outline,
        'border-3': outline,
        'border-gray-200 text-gray-200': variant === 'primary' && outline,
        'border-gray-300 text-gray-300': variant === 'secondary' && outline,
        'border-gray-400 text-gray-400': variant === 'tertiary' && outline,
        'border-yellow-600 text-yellow-600': variant === 'warning' && outline,
        'border-red-600 text-red-600': variant === 'danger' && outline,
        'cursor-pointer': !disabled,
        'cursor-not-allowed': disabled,
        'opacity-50': loading,
        'opacity-100': !loading,
      },
      {
        'hover:bg-purple-700 hover:text-white': variant === 'primary',
        'hover:bg-gray-500 hover:text-white hover:border-gray-500': variant === 'secondary',
        'hover:bg-gray-600 hover:text-white': variant === 'tertiary',
        'hover:bg-yellow-700 hover:text-white': variant === 'warning',
        'hover:bg-red-700 hover:text-white': variant === 'danger',
      },
      {
        'px-3 py-2': size === 'regular',
        'px-1 py-1': size === 'small',
      },
      {
        'flex items-center justify-center border-0': icon,
        border: !icon,
      },
      'transition-all duration-200 ease-in-out rounded font-medium'
    )}
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
  >
    {loading ? 'Loading...' : children}
  </button>
);
