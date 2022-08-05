import { Button } from '@components/atoms';
import { Category, Expense } from '@prisma/client';

import { trpc } from '@utils/trpc';
import { useCallback } from 'react';

interface Props {
  expense: Expense & { categories: Category[] };
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
    <li className="flex flex-col border p-3 gap-3">
      <div className="grid grid-cols-4">
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
      </div>
      <div>
        {expense.categories.map((category) => (
          <span key={category.id} className="inline-block bg-gray-200 px-2 py-1 mr-2">
            {category.name}
          </span>
        ))}
      </div>
    </li>
  );
};
