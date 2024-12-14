import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
} from 'react-hook-form';

type Props<F extends FieldValues> = {
  name: Path<F>;
  label: string;
  control: Control<F, unknown>;
  invalidText:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  disabled?: boolean;
};

export const TextAreaInput = <F extends FieldValues>({
  name,
  label,
  control,
  invalidText,
  disabled = false,
}: Props<F>) => {
  return (
    <div>
      <Controller
        disabled={disabled}
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-y-2">
            <label className="text-sm font-semibold" htmlFor={name}>
              {label}
            </label>
            <textarea
              disabled={disabled}
              placeholder={label}
              {...field}
              className={`w-full h-36 px-4 py-2 rounded resize-none focus:outline-sky-300 ${invalidText ? 'bg-red-100 text-red-600 !outline-red-600' : 'bg-slate-100 text-slate-600'}`}
            />
            {typeof invalidText === 'string' && (
              <p className="text-sm text-red-600">{invalidText}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};
