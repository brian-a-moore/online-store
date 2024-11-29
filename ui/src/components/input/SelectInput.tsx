import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, Path } from 'react-hook-form';

type Props<F extends FieldValues> = {
  name: Path<F>;
  label: string;
  control: Control<F, unknown>;
  options: Map<string | number, string>;
  invalidText: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  disabled?: boolean;
};

export const SelectInput = <F extends FieldValues>({
  name,
  label,
  control,
  options,
  invalidText,
  disabled = false,
}: Props<F>) => {
  return <div>
    <Controller
      disabled={disabled}
      name={name}
      control={control}
        render={({ field }) => (
          <div className='flex flex-col gap-y-2'>
            <label className='text-sm font-semibold' htmlFor={name}>{label}</label>
            <select
              id={name}
              {...field}
              onChange={(e) => {
                const value = options.has(Number(e.target.value)) ? Number(e.target.value) : e.target.value;
                field.onChange(value);
              }}
              className={`h-12 px-4 rounded focus:outline-sky-300 ${invalidText ? 'bg-red-100 text-red-600 !outline-red-600' : 'bg-slate-100 text-slate-600'}`}
            >
              {Array.from(options.entries()).map(([id, value]) => (
                <option key={id} value={id}>
                  {value}
                </option>
              ))}
            </select>
            {typeof invalidText === 'string' && <div className='text-sm text-red-600'>{invalidText}</div>}
          </div>
        )}
    />
  </div>;
};
