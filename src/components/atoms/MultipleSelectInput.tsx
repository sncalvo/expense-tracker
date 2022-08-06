import clsx from 'clsx';
import { useState, useCallback, useEffect } from 'react';
import { Button } from './Button';

import { AiFillPlusCircle, AiFillTags, AiFillCloseCircle } from 'react-icons/ai';

interface Value {
  id: string;
  name: string;
}

interface Props {
  onAdd: (suggestion: { id?: string; name: string }) => void;
  suggestions: Value[];
  values: Value[];
  onRemove: (id: string) => void;
  setSuggestionValue: (value: string) => void;
}

export const MultipleSelectInput: React.FC<Props> = ({
  onAdd,
  suggestions,
  values,
  onRemove,
  setSuggestionValue,
}) => {
  const [openCategories, setOpenCategories] = useState(false);

  const [value, setValue] = useState('');
  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  const onCreatePress = useCallback(() => {
    if (!value || value.length <= 0) {
      return;
    }

    onAdd({ name: value });
    setValue('');
  }, [value, onAdd]);

  const onUseSuggestion = useCallback(
    (suggestion: Value) => {
      onAdd(suggestion);
      setValue('');
    },
    [onAdd]
  );

  useEffect(() => {
    setSuggestionValue(value);
  }, [setSuggestionValue, value]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        {values.map(({ id, name }) => (
          <div key={id} className="flex gap-1 items-center border p-1 rounded">
            <span>{name}</span>
            <Button
              type="button"
              variant="danger"
              size="small"
              onClick={() => onRemove(id)}
              outline
              icon
            >
              <AiFillCloseCircle />
            </Button>
          </div>
        ))}
        <Button
          variant="primary"
          type="button"
          size="small"
          onClick={() => setOpenCategories(!openCategories)}
          icon
        >
          <AiFillTags size={24} />
        </Button>
      </div>

      <div>
        <div
          className={clsx('absolute transition-all', {
            '-translate-x-full opacity-0 cursor-not-allowed pointer-events-none': !openCategories,
            'translate-x-0 opacity-100': openCategories,
          })}
        >
          <div className="flex gap-1">
            <input
              type="text"
              className="w-full border rounded p-2"
              value={value}
              onChange={onValueChange}
            />

            <Button type="button" variant="secondary" onClick={onCreatePress} size="small" icon>
              <AiFillPlusCircle size={24} />
            </Button>
          </div>

          {suggestions.length !== 0 && value !== '' && (
            <div className="flex gap-1 bg-white rounded p-1">
              {suggestions
                .filter(
                  ({ id }) => values.find(({ id: categoryId }) => id === categoryId) === undefined
                )
                .map(({ id, name }) => (
                  <Button
                    key={id}
                    variant="secondary"
                    outline
                    type="button"
                    onClick={() => {
                      onUseSuggestion({ name, id });
                    }}
                  >
                    <span>{name}</span>
                  </Button>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
