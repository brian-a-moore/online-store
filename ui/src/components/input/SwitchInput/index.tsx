import { mdiToggleSwitchOffOutline, mdiToggleSwitchOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Label from '../Label';

type Props<F extends FieldValues> = {
  name: Path<F>;
  label: string;
  control: Control<F, unknown>;
};

export default function SwitchInput<F extends FieldValues>({ name, label, control }: Props<F>) {
  return (
    <div className="flex">
      <label className="flex gap-x-4 items-center">
        <Label>{label}</Label>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <button type="button" onClick={() => onChange(!value)}>
              <Icon
                path={value ? mdiToggleSwitchOutline : mdiToggleSwitchOffOutline}
                size={2}
                color={value ? '#0284C7' : '#475569'}
              />
            </button>
          )}
        />
      </label>
    </div>
  );
}
