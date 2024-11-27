import { HTMLInputTypeAttribute } from 'react';
import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, Path } from 'react-hook-form';
import ErrorText from '../ErrorText';
import Label from '../Label';

type Props<F extends FieldValues> = {
  className?: string;
  disabled?: boolean;
  required?: boolean;
  invalidText: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  name: Path<F>;
  label: string;
  type?: HTMLInputTypeAttribute;
  multiline?: boolean;
  maxRows?: number;
  control: Control<F, unknown>;
};

export default function TextInput<F extends FieldValues>({
  className,
  disabled = false,
  required = false,
  invalidText,
  name,
  label,
  type = 'text',
  multiline = false,
  maxRows = 8,
  control,
}: Props<F>) {
  return (
    <Controller
      disabled={disabled}
      name={name}
      control={control}
      rules={{ required }}
      render={({ field }) => (
        <div className={`flex flex-col gap-y-2 ${className}`}>
          <Label htmlFor={name}>{label}</Label>
          {!multiline ? (
            <input
              disabled={disabled}
              type={type === 'number' ? 'text' : type}
              placeholder={label}
              {...field}
              onChange={(e) => {
                if (type === 'number') {
                  const value = e.target.value;
                  const onlyNumbersValue = value.replace(/[^0-9]/g, '');
                  field.onChange(Number(onlyNumbersValue));
                } else {
                  field.onChange(e.target.value);
                }
              }}
              className={`h-12 px-4 rounded ${invalidText ? 'bg-[var(--input-background-error-color)] text-[var(--text-error-color)] outline-[var(--outline-error-color)]' : ''}`}
            />
          ) : (
            <textarea
              disabled={disabled}
              placeholder={label}
              rows={maxRows}
              {...field}
              className={`h-36 px-4 py-2 rounded resize-none ${invalidText ? 'bg-[var(--input-background-error-color)] text-[var(--text-error-color)] outline-[var(--outline-error-color)]' : ''}`}
            />
          )}
          {typeof invalidText === 'string' && <ErrorText>{invalidText}</ErrorText>}
        </div>
      )}
    />
  );
}
