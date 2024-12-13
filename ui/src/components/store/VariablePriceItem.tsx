import { useEffect, useState } from 'react';
import { VariableItemConfig } from '../../../../api/src/types/itemConfigs';
import { TCartItem } from '../../context/CartContext';
import { Item } from '../../pages/public';
import { formatCurrency } from '../../utils';
import { Button } from '../interactive';

type Props = {
  item: Item;
  addItemToCart: (item: TCartItem) => void;
};

export const VariablePriceItem: React.FC<Props> = ({ item, addItemToCart }) => {
  const [customAmount, setCustomAmount] = useState<number>(0);

  const { defaultAmount, minAmount, maxAmount, presetAmounts }: VariableItemConfig = JSON.parse(item.config);

  useEffect(() => {
    if (defaultAmount && !isNaN(defaultAmount)) setCustomAmount(defaultAmount);
  }, [defaultAmount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCustomAmount(value < minAmount ? minAmount : value > maxAmount ? maxAmount : value);
  };
  return (
    <>
      {presetAmounts.length ? (
        <div className="flex flex-wrap gap-2">
          {presetAmounts.map((amount) => (
            <Button variant="secondary" key={amount} onClick={() => setCustomAmount(amount)}>
              {formatCurrency(amount)}
            </Button>
          ))}
        </div>
      ) : null}
      <div className="flex items-center justify-center gap-4">
        {'$'}
        <input
          className={`h-12 px-4 rounded`}
          type="number"
          onChange={handleChange}
          min={minAmount}
          max={maxAmount}
          value={customAmount}
        />
        {'.00'}
      </div>
      <Button
        disabled={customAmount < 1}
        onClick={() => {
          addItemToCart({
            id: item.id,
            name: item.name,
            product: item.product,
            price: customAmount,
            quantity: 1,
            maxQuantityPerOrder: item.maxQuantityPerOrder,
          });
          setCustomAmount(0);
        }}
      >
        Add to Cart
      </Button>
    </>
  );
};
