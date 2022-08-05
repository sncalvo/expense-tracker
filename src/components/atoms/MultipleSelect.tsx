import { useCallback, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  suggestions: string[];
  lastValue: string;
  setLastValue: (value: string) => void;
}

export const MultipleSelect: React.FC<Props> = ({
  name,
  label,
  lastValue,
  setLastValue,
  suggestions,
}) => {
  const { fields, append, remove } = useFieldArray({ name, keyName: 'key' });

  const onAdd = useCallback(() => {
    append({ value: lastValue });
    setLastValue('');
  }, [append, lastValue, setLastValue]);

  const onValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLastValue(e.target.value);
    },
    [setLastValue]
  );

  const [inputFocused, setInputFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>

      <div className="flex flex-col gap-1">
        {fields.map((field, index) => (
          <div key={field.key} className="flex flex-col gap-1">
            <input
              {...field}
              readOnly
              className="border rounded p-2"
              type="text"
              placeholder="Add a suggestion"
            />
            <button type="button" className="bg-gray-200 px-2 py-1" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}

        <div className="flex gap-1">
          <input
            type="text"
            className="border rounded p-2"
            value={lastValue}
            onChange={onValueChange}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          <button type="button" className="bg-gray-200 px-2 py-1" onClick={onAdd}>
            Add
          </button>
        </div>

        {suggestions.length > 0 && inputFocused && (
          <div className="flex flex-col gap-1">
            {suggestions.map((suggestion) => (
              <button key={suggestion} onClick={() => {}}>
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
