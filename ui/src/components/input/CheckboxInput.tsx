import { mdiCheckboxBlankCircle, mdiCheckboxMarkedCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type Props<F extends FieldValues> = {
  name: Path<F>;
  label: string;
  control: Control<F, unknown>;
  disabled?: boolean;
};

export const CheckboxInput = <F extends FieldValues>({
  name,
  label,
  control,
  disabled = false,
}: Props<F>) => {
  return <label className='flex gap-x-4 items-center'>
    <Controller
      disabled={disabled}
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <div className='flex flex-col gap-y-2'>
          <input type='checkbox' onChange={onChange} onBlur={onBlur} checked={value} name={name} ref={ref} hidden />
          <Icon path={value ? mdiCheckboxMarkedCircle : mdiCheckboxBlankCircle} size={1} color={value ? '#0284C7' : '#475569'} />
        </div>
      )}
    />
    {label}
  </label>;
};
