import clsx from 'clsx';
import { useFormContext, useFormState } from 'react-hook-form';

import { get } from '@utils/get';

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'textarea';
}

export const Input = ({ name, label, placeholder, type = 'text' }: Props) => {
  const { register } = useFormContext();
  const state = useFormState();
  const formError = get(state.errors, name)?.message as string | undefined;

  const errorMessage = formError;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>

      {type === 'textarea' ? (
        <textarea
          {...register(name)}
          id={name}
          className={clsx(
            {
              'border-red-600': errorMessage,
              'border-gray-300': !errorMessage,
            },
            'border border-gray-600 rounded p-2 bg-slate-800 outline-none focus:border-white transition-all'
          )}
          placeholder={placeholder}
          aria-invalid={errorMessage ? 'true' : 'false'}
        />
      ) : (
        <input
          {...register(name)}
          id={name}
          className={clsx(
            {
              'border-red-600': errorMessage,
              'border-gray-300': !errorMessage,
            },
            'border border-gray-600 rounded p-2 bg-slate-800 outline-none focus:border-white transition-all'
          )}
          type={type}
          placeholder={placeholder}
          aria-invalid={errorMessage ? 'true' : 'false'}
        />
      )}

      {errorMessage && (
        <span role="alert" className="text-red-600">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
