import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useEffect, useState } from 'react';
import { ListItemsPublicResponse } from '../../../../api/src/types/api';
import { VariableItemConfig } from '../../../../api/src/types/itemConfigs';
import { TCartItem } from '../../context/CartContext';
import { ModalContext } from '../../context/ModalContext';
import { formatCurrency } from '../../utils';
import { Button } from '../interactive';
import { EmptyText, H3, H4, H5 } from '../typography';

type Props = {
  item: ListItemsPublicResponse['items'][0];
  addItemToCart: (item: TCartItem) => void;
};

export const VariablePriceItem: React.FC<Props> = ({ item, addItemToCart }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const [customAmount, setCustomAmount] = useState<number>(0);

  const {
    defaultAmount,
    minAmount,
    maxAmount,
    presetAmounts,
  }: VariableItemConfig = JSON.parse(item.config);

  useEffect(() => {
    if (defaultAmount && !isNaN(defaultAmount)) setCustomAmount(defaultAmount);
  }, [defaultAmount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setCustomAmount(
      value < minAmount ? minAmount : value > maxAmount ? maxAmount : value,
    );
  };

  const addToCart = () => {
    addItemToCart({
      id: item.id,
      name: item.name,
      product: item.product,
      price: customAmount,
      quantity: 1,
      maxQuantityPerOrder: item.maxQuantityPerOrder,
    });
    setCustomAmount(0);
  };

  const openMoreInfo = () => {
    openModal(
      <>
        <H3>{item.name}</H3>
        <H5>Description:</H5>
        {item.description ? (
          <p>{item.description}</p>
        ) : (
          <EmptyText>No description available for this item.</EmptyText>
        )}
        <div className="flex justify-center">
          <Button variant="tertiary" onClick={closeModal}>
            Close
          </Button>
        </div>
      </>,
    );
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-2">
        <H4>{formatCurrency(customAmount)}</H4>
        <div>
          <button
            className="text-left hover:underline text-sky-600 font-semibold"
            onClick={openMoreInfo}
          >
            <H5 className="text-sm line-clamp-3" title={item.name}>
              {item.name}
            </H5>
          </button>
        </div>

        <p
          className="text-sm line-clamp-1 opacity-60 mt-[-4px]"
          title={item.product.name}
        >
          {item.product.name}
        </p>
        {presetAmounts.length ? (
          <div className="grid grid-cols-2 gap-2 justify-center">
            {presetAmounts.map((amount) => (
              <Button
                variant="secondary"
                key={amount}
                onClick={() => setCustomAmount(amount)}
              >
                {formatCurrency(amount)}
              </Button>
            ))}
          </div>
        ) : null}
        <div className="flex items-center justify-center gap-4">
          {'$'}
          <input
            className={`h-12 px-4 rounded bg-slate-100 text-slate-600`}
            type="number"
            onChange={handleChange}
            min={minAmount}
            max={maxAmount}
            value={customAmount}
          />
          {'.00'}
        </div>
      </div>
      <div className="self-end">
        <Button
          onClick={addToCart}
          title="Add to Cart"
          disabled={customAmount <= 0}
        >
          <Icon path={mdiPlus} size={0.75} />
        </Button>
      </div>
    </>
  );
};
