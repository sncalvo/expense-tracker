import { trpc } from '@utils/trpc';
import { useCallback, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

type FormValues = {
  categories: { id: string; name: string }[];
};

export const CategorySelectionInput: React.FC = () => {
  const name = 'categories';
  const [value, setValue] = useState('');

  const categories = trpc.useQuery(['categories.allCategories', value]);
  const createCategory = trpc.useMutation(['categories.createCategory']);

  const { register } = useFormContext();

  const { fields, append, remove } = useFieldArray<FormValues, 'categories', 'key'>({
    name,
    keyName: 'key',
  });

  const onCreate = useCallback(() => {
    createCategory.mutate(
      { name: value },
      {
        onSuccess(data) {
          append({ name: data.name, id: data.id });
          setValue('');
        },
      }
    );
  }, [append, createCategory, value]);

  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-gray-700">
        Categories
      </label>

      <div className="flex flex-col gap-1">
        {fields.map((field, index) => (
          <div key={field.key} className="flex gap-1">
            <input
              {...register(`${name}.${index}.name`)}
              readOnly
              className="border rounded p-2"
              type="text"
              placeholder="Add a suggestion"
            />
            <input {...register(`${name}.${index}.id`)} hidden readOnly />
            <button type="button" className="bg-gray-200 px-2 py-1" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}

        <div className="flex gap-1">
          <input
            type="text"
            className="w-full border rounded p-2"
            value={value}
            onChange={onValueChange}
          />
          <button type="button" className="bg-gray-200 px-2 py-1 flex-none" onClick={onCreate}>
            Create/Add
          </button>
        </div>

        {categories.data && categories.data.length !== 0 && value !== '' && (
          <div className="flex flex-col gap-1">
            {categories.data
              .filter(
                ({ id }) => fields.find(({ id: categoryId }) => id === categoryId) === undefined
              )
              .map((suggestion) => (
                <button
                  type="button"
                  key={suggestion.id}
                  onClick={() => {
                    append({ name: suggestion.name, id: suggestion.id });
                  }}
                >
                  <span>{suggestion.name}</span>
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
