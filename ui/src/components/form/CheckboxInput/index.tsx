import { Control, Controller, FieldValues, Path } from 'react-hook-form';

type Props<F extends FieldValues> = {
  name: Path<F>;
  label: string;
  control: Control<F, unknown>;
};

export default function CheckboxInput<F extends FieldValues>({ name, label, control }: Props<F>) {
  return (
    <div>
      <label className="flex gap-x-4 items-center">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <input type="checkbox" onChange={onChange} onBlur={onBlur} checked={value} name={name} ref={ref} />
          )}
        />
        {label}
      </label>
    </div>
  );
}
