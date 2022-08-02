import clsx from 'clsx';
import { useFormContext, useFormState } from 'react-hook-form';

import { get } from '@utils/get';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
}

export const Input = ({ name, label, placeholder, type = 'text' }: Props) => {
  const { register } = useFormContext();
  const state = useFormState();
  const formError = get(state.errors, name)?.message as string | undefined;

  const errorMessage = formError;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      <input
        {...register(name)}
        className={clsx({
          'border-red-600': errorMessage,
          'border-gray-300': !errorMessage,
        })}
        type={type}
        placeholder={placeholder}
        aria-invalid={errorMessage ? 'true' : 'false'}
      />
      {errorMessage && (
        <span role="alert" className="text-red-600">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
