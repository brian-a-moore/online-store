import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, Path } from 'react-hook-form';

type Props<F extends FieldValues> = {
  type?: string;
  name: Path<F>;
  label: string;
  control: Control<F, unknown>;
  invalidText: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  disabled?: boolean;
};

export const TextInput = <F extends FieldValues>({
  type = 'text',
  name,
  label,
  control,
  invalidText,
  disabled = false,
}: Props<F>) => {
  return <div>
    <Controller
      disabled={disabled}
      name={name}
      control={control}
      render={({ field: { onChange, ...field } }) => (
        <div className='flex flex-col gap-y-2'>
          <label className='text-sm font-semibold' htmlFor={name}>{label}</label>
          <input
            type={type}
            disabled={disabled}
            placeholder={label}
            {...field}
            onChange={(e) => {
              const value = e.target.value;
              onChange(type === 'number' ? parseFloat(value) : value);
            }}
            className={`h-12 px-4 rounded focus:outline-sky-300 ${invalidText ? 'bg-red-100 text-red-600 !outline-red-600' :'bg-slate-100 text-slate-600'}`}
          />
          {typeof invalidText === 'string' && <div className='text-sm text-red-600'>{invalidText}</div>}
        </div>
      )}
    />
  </div>;
};
