import { mdiClose, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect, useState } from 'react';
import { VariableItemConfig } from '../../../../../api/src/types/itemConfigs';
import { formatCurrency } from '../../../utils';
import { Button } from '../../interactive';
import { EmptyText } from '../../typography';
import Label from '../Label';

type Props = {
  onChange: (values: number[]) => void;
  config: VariableItemConfig;
};

export default function PresetAmountsInput({ onChange, config }: Props) {
  const [amounts, setAmounts] = useState<number[]>([]);
  const [value, setValue] = useState<number>(config.defaultAmount || 1);

  useEffect(() => {
    onChange(amounts);
  }, [amounts]);

  const updateCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
  };

  const addAmountToArray = () => {
    let valueToAdd;
    if (value < config.minAmount) {
      valueToAdd = config.minAmount;
    } else if (value > config.maxAmount) {
      valueToAdd = config.maxAmount;
    } else {
      valueToAdd = value;
    }
    setAmounts((prevState) => {
      if (prevState.length < 5) {
        return [...prevState, valueToAdd];
      } else {
        return prevState;
      }
    });
    setValue(config.defaultAmount || 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <Label>Preset Amounts</Label>
      {amounts.length ? (
        <div className="flex gap-2 flex-wrap">
          {amounts.map((amount, index) => (
            <div className="flex gap-4 p-2 bg-sky-200 items-center rounded">
              <p key={index} className="flex-1 text-sky-700 text-sm font-semibold">
                {formatCurrency(amount)}
              </p>
              <Button
                variant="transparent"
                className="!p-0"
                onClick={() => setAmounts(amounts.filter((_, i) => i !== index))}
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
          className={`flex-1 w-full h-12 px-4 rounded disabled:cursor-not-allowed disabled:text-slate-300`}
          disabled={amounts.length >= 5}
          type="number"
          placeholder="Preset Amount"
          value={value}
          min={config.minAmount || 1}
          max={config.maxAmount}
          maxLength={(config.maxAmount || 999999).toString().length}
          onChange={updateCurrentValue}
        />
        <Button variant="secondary" disabled={amounts.length >= 5} onClick={addAmountToArray}>
          <Icon path={mdiPlus} size={0.75} />
        </Button>
      </div>
    </div>
  );
}
