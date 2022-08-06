import { useCallback, useState } from 'react';
import { Category, Expense } from '@prisma/client';

import { Button, MultipleSelectInput } from '@components/atoms';

import { trpc } from '@utils/trpc';

import { AiFillCloseCircle } from 'react-icons/ai';

interface Props {
  expense: Expense & { categories: Category[] };
}

export const ExpenseCard: React.FC<Props> = ({ expense }) => {
  const deleteMutation = trpc.useMutation(['expense.deleteExpense']);
  const updateCategoriesMutation = trpc.useMutation(['expense.udpateCategories']);
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

  const [suggestionValue, setSuggestionValue] = useState('');

  const categories = trpc.useQuery(['categories.allCategories', suggestionValue]);
  const createCategory = trpc.useMutation(['categories.createCategory']);

  const onCreate = useCallback(
    ({ name }: { id?: string; name: string }) => {
      createCategory.mutate(
        { name },
        {
          onSuccess(data) {
            updateCategoriesMutation.mutate(
              {
                id: expense.id,
                categories: {
                  connectOrCreate: [
                    {
                      name: data.name,
                      id: data.id,
                    },
                  ],
                },
              },
              {
                onSuccess: () => {
                  trpcContext.invalidateQueries(['expense.allExpenses']);
                },
              }
            );
          },
        }
      );
    },
    [createCategory, expense.id, trpcContext, updateCategoriesMutation]
  );

  const onRemove = useCallback(
    (id: string) => {
      updateCategoriesMutation.mutate(
        {
          id: expense.id,
          categories: {
            disconnect: [
              {
                id,
              },
            ],
          },
        },
        {
          onSuccess: () => {
            trpcContext.invalidateQueries(['expense.allExpenses']);
          },
        }
      );
    },
    [expense.id, trpcContext, updateCategoriesMutation]
  );

  return (
    <li className="flex flex-col border p-3 gap-3 rounded">
      <div className="grid grid-cols-4">
        <div className="col-span-2">
          <h3 className="text-md">{expense.name}</h3>
          <p className="text-sm">{expense.description}</p>
        </div>

        <h3 className="col-span-1 text-md">{expense.amount}</h3>

        <div className="col-span-1 flex justify-end items-start">
          <Button type="button" outline variant="danger" onClick={deleteExpense} size="small" icon>
            <AiFillCloseCircle />
          </Button>
        </div>
      </div>

      <MultipleSelectInput
        onAdd={onCreate}
        values={expense.categories}
        suggestions={categories.data ?? []}
        onRemove={onRemove}
        setSuggestionValue={setSuggestionValue}
      />
    </li>
  );
};
