import { useCallback, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { MultipleSelectInput } from '@components/atoms';
import { trpc } from '@utils/trpc';

type FormValues = {
  categories: { id: string; name: string }[];
};

export const CategorySelectionInput: React.FC = () => {
  const name = 'categories';
  const [suggestionValue, setSuggestionValue] = useState('');

  const categories = trpc.useQuery(['categories.allCategories', suggestionValue]);
  const createCategory = trpc.useMutation(['categories.createCategory']);

  const { fields, append, remove } = useFieldArray<FormValues, 'categories', 'key'>({
    name,
    keyName: 'key',
  });

  const { register } = useFormContext();

  const onCreate = useCallback(
    ({ name }: { id?: string; name: string }) => {
      createCategory.mutate(
        { name },
        {
          onSuccess(data) {
            append({ name: data.name, id: data.id });
          },
        }
      );
    },
    [append, createCategory]
  );

  const onRemove = useCallback(
    (id: string) => {
      remove(fields.findIndex(({ id: fieldId }) => fieldId === id));
    },
    [fields, remove]
  );

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-gray-700">
        Categories
      </label>

      <div className="invisible">
        {fields.map((field, index) => (
          <input key={field.id} {...register(`${name}.${index}.id`)} hidden />
        ))}
      </div>

      <MultipleSelectInput
        onAdd={onCreate}
        values={fields}
        suggestions={categories.data ?? []}
        onRemove={onRemove}
        setSuggestionValue={setSuggestionValue}
      />
    </div>
  );
};
