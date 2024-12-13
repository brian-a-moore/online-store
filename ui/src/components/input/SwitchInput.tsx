import { mdiToggleSwitchOffOutline, mdiToggleSwitchOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge, Path } from 'react-hook-form';

type Props<F extends FieldValues> = {
  name: Path<F>;
  label: string;
  control: Control<F, unknown>;
  invalidText: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  disabled?: boolean;
};

export const SwitchInput = <F extends FieldValues>({
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
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-4 items-center">
              <label className="text-sm font-semibold" htmlFor={name}>
                {label}
              </label>
              <button disabled={disabled} type="button" onClick={() => onChange(!value)}>
                <Icon
                  path={value ? mdiToggleSwitchOutline : mdiToggleSwitchOffOutline}
                  size={2}
                  color={value ? '#0EA5E9' : '#475569'}
                />
              </button>
            </div>
            {typeof invalidText === 'string' && <p className="text-sm text-red-600">{invalidText}</p>}
          </div>
        )}
      />
    </div>
  );
};
