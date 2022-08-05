import { useForm, FormProvider } from 'react-hook-form';
import { ZodSchema } from 'zod';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';

interface Props<T> {
  children: React.ReactNode;
  onSubmit: (data: T) => void;
  schema: ZodSchema<T>;
  defaultValues?: T;
}

export const Form = <T,>({ children, onSubmit, schema, defaultValues }: Props<T>) => {
  const methods = useForm<T>({ resolver: zodResolver(schema) });

  const submit = useCallback(
    (data: T) => {
      onSubmit(data);
      methods.reset(defaultValues);
    },
    [onSubmit, methods, defaultValues]
  );

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
      </FormProvider>
      {process.env.NODE_ENV === 'development' && <DevTool control={methods.control} />}
    </>
  );
};
