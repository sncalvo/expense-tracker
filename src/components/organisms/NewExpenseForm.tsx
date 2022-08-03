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
      expenseCreation.mutate(expense, {
        onSuccess: () => {
          trpcContext.invalidateQueries(['expense.allExpenses']);
        },
      });
    },
    [trpcContext, expenseCreation]
  );

  return (
    <Form onSubmit={createExpense} schema={Expense}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Input name="name" label="Name" placeholder="Name" />
        <Input name="amount" label="Amount" placeholder="Amount" />

        <div className="col-span-2 md:col-span-3">
          <Input name="description" label="Description" placeholder="Description" type="textarea" />
        </div>

        <div className="flex">
          <Button type="submit" loading={expenseCreation.isLoading}>
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};
