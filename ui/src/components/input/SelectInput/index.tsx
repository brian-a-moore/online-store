import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import ErrorText from '../ErrorText';
import Label from '../Label';

type Props<F extends FieldValues> = {
  name: Path<F>;
  label: string;
  options: Map<string | number, string>;
  control: Control<F, unknown>;
  required?: boolean;
  invalidText?: string;
};

export default function SelectInput<F extends FieldValues>({
  name,
  label,
  options,
  control,
  required = false,
  invalidText,
}: Props<F>) {
  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <select
            id={name}
            {...field}
            className={`h-12 px-4 rounded ${invalidText ? 'bg-[var(--input-background-error-color)] text-[var(--text-error-color)] outline-[var(--outline-error-color)]' : ''}`}
          >
            {Array.from(options.entries()).map(([id, value]) => (
              <option key={id} value={id}>
                {value}
              </option>
            ))}
          </select>
        )}
      />
      {typeof invalidText === 'string' && <ErrorText>{invalidText}</ErrorText>}
    </div>
  );
}
