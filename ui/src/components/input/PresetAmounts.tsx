import { mdiClose, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect, useState } from 'react';
import { VariableItemConfig } from '../../../../api/src/types/itemConfigs';
import { formatCurrency } from '../../utils';
import { Button } from '../interactive';
import { EmptyText } from '../typography';

type Props = {
  onChange: (values: number[]) => void;
  config: VariableItemConfig;
  defaultValues?: number[];
};

export const PresetAmounts: React.FC<Props> = ({
  onChange,
  config,
  defaultValues,
}) => {
  const [amounts, setAmounts] = useState<number[]>(defaultValues || []);
  const [value, setValue] = useState<string>(
    config.defaultAmount.toString() || '',
  );

  useEffect(() => {
    onChange(amounts);
  }, [amounts]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setValue(newValue);
    }
  };

  const handleOnBlur = () => {
    if (value === '') {
      setValue('0');
    }
  };

  const addAmountToArray = () => {
    const convertedValue = parseInt(value);
    let valueToAdd;
    if (convertedValue < config.minAmount) {
      valueToAdd = config.minAmount;
    } else if (convertedValue > config.maxAmount) {
      valueToAdd = config.maxAmount;
    } else {
      valueToAdd = convertedValue;
    }
    setAmounts((prevState) => {
      if (prevState.length < 5) {
        return [...prevState, valueToAdd];
      } else {
        return prevState;
      }
    });
    setValue(config.defaultAmount.toString() || '');
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-semibold">Preset Amounts</label>
      {amounts.length ? (
        <div className="flex gap-2 flex-wrap">
          {amounts.map((amount, index) => (
            <div className="flex gap-4 p-2 bg-sky-200 items-center rounded">
              <p
                key={index}
                className="flex-1 text-sky-700 text-sm font-semibold"
              >
                {formatCurrency(amount)}
              </p>
              <Button
                variant="tertiary"
                className="!p-0"
                onClick={() =>
                  setAmounts(amounts.filter((_, i) => i !== index))
                }
              >
                <Icon path={mdiClose} size={0.75} color="#EF4444" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyText>No preset amounts</EmptyText>
      )}
      <div className="flex gap-4">
        <input
          type="text"
          className={`flex-1 w-full h-12 px-4 rounded disabled:cursor-not-allowed disabled:text-slate-300 focus:outline-sky-300 bg-slate-100 text-slate-600`}
          disabled={amounts.length >= 5}
          placeholder="Preset Amount"
          value={value}
          min={config.minAmount || 1}
          max={config.maxAmount}
          maxLength={(config.maxAmount || 999999).toString().length}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
        <Button disabled={amounts.length >= 5} onClick={addAmountToArray}>
          <Icon path={mdiPlus} size={0.75} />
        </Button>
      </div>
    </div>
  );
};
