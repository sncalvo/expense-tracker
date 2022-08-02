import { Button, Form, Input } from '@components/atoms';
import { Expense } from '@schemas/Expense';
import { trpc } from '@utils/trpc';
import { useCallback } from 'react';

import { z } from 'zod';

export const NewExpenseForm = () => {
  const trpcContext = trpc.useContext();

  const expenseCreation = trpc.useMutation(['expense.createExpense']);

  const createExpense = useCallback(
    (expense: z.infer<typeof Expense>) => {
      expenseCreation.mutate(expense);

      trpcContext.invalidateQueries(['expense.allExpenses']);
    },
    [trpcContext, expenseCreation]
  );

  return (
    <Form onSubmit={createExpense} schema={Expense}>
      <Input name="name" label="Name" placeholder="Name" />
      <Input name="amount" label="Amount" placeholder="Amount" />
      <Input name="description" label="Description" placeholder="Description" />
      <Button type="submit" loading={expenseCreation.isLoading}>
        Submit
      </Button>
    </Form>
  );
};