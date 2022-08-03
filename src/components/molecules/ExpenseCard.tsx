import { Button } from '@components/atoms';
import { Expense } from '@schemas/Expense';
import { trpc } from '@utils/trpc';
import { useCallback } from 'react';
import { z } from 'zod';

interface Props {
  expense: z.infer<typeof Expense> & { id: string };
}

export const ExpenseCard: React.FC<Props> = ({ expense }) => {
  const deleteMutation = trpc.useMutation(['expense.deleteExpense']);
  const trpcContext = trpc.useContext();

  const deleteExpense = useCallback(() => {
    deleteMutation.mutate(
      { id: expense.id },
      {
        onSuccess: () => {
          trpcContext.invalidateQueries(['expense.allExpenses']);
        },
      }
    );
  }, [deleteMutation, expense.id, trpcContext]);

  return (
    <li className="grid grid-cols-4 border p-3">
      <div className="col-span-2">
        <h3 className="text-md">{expense.name}</h3>
        <p className="text-sm">{expense.description}</p>
      </div>

      <h3 className="col-span-1 text-md">{expense.amount}</h3>

      <div className="flex col-span-1 items-stretch justify-end">
        <Button type="button" outline variant="danger" onClick={deleteExpense}>
          Delete
        </Button>
      </div>
    </li>
  );
};
