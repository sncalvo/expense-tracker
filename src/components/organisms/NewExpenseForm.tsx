import { Button, Form, Input } from '@components/atoms';
import { CategorySelectionInput } from '@components/molecules';
import { Expense } from '@schemas/Expense';
import { trpc } from '@utils/trpc';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';

import { z } from 'zod';

export const NewExpenseForm = () => {
  const trpcContext = trpc.useContext();

  const expenseCreation = trpc.useMutation(['expense.createExpense']);

  const createExpense = useCallback(
    (expense: z.infer<typeof Expense>) => {
      console.log(expense);
      expenseCreation.mutate(expense, {
        onSuccess: () => {
          trpcContext.invalidateQueries(['expense.allExpenses']);
        },
      });
    },
    [trpcContext, expenseCreation]
  );

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
      amount: 0,
      categories: [],
    }),
    []
  );

  const [openCategories, setOpenCategories] = useState(false);

  return (
    <Form onSubmit={createExpense} schema={Expense} defaultValues={defaultValues}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Input name="name" label="Name" placeholder="Name" />
        <Input name="amount" label="Amount" placeholder="Amount" />

        <div className="col-span-2 md:col-span-3">
          <Input name="description" label="Description" placeholder="Description" type="textarea" />
        </div>

        <div className="col-span-2">
          <CategorySelectionInput />
        </div>

        <div className="col-span-2 md:grid-cols-3 flex">
          <Button type="submit" loading={expenseCreation.isLoading}>
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};
