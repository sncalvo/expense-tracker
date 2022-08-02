import { useForm, FormProvider } from 'react-hook-form';
import { ZodSchema } from 'zod';

import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props<T> {
  children: React.ReactNode;
  onSubmit: (data: T) => void;
  schema: ZodSchema<T>;
}

export const Form = <T,>({ children, onSubmit, schema }: Props<T>) => {
  const methods = useForm<T>({ resolver: zodResolver(schema) });

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
      </FormProvider>
      {process.env.NODE_ENV === 'development' && <DevTool control={methods.control} />}
    </>
  );
};
