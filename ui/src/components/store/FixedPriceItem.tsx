import { mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { ListItemsPublicResponse } from '../../../../api/src/types/api';
import { FixedItemConfig } from '../../../../api/src/types/itemConfigs';
import { TCartItem } from '../../context/CartContext';
import { ModalContext } from '../../context/ModalContext';
import { formatCurrency } from '../../utils';
import { Button } from '../interactive';
import { EmptyText, H3, H4, H5 } from '../typography';

type Props = {
  item: ListItemsPublicResponse['items'][0];
  addItemToCart: (item: TCartItem) => void;
};

export const FixedPriceItem: React.FC<Props> = ({ item, addItemToCart }) => {
  const { closeModal, openModal } = useContext(ModalContext);
  const [quantity, setQuantity] = useState<number>(1);

  const config: FixedItemConfig = JSON.parse(item.config);

  const addToCart = () => {
    addItemToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      product: item.product,
      price: config.price,
      quantity,
      maxQuantityPerOrder: item.maxQuantityPerOrder,
    });
    setQuantity(1);
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
        <div className="flex justify-between">
          <Button variant="tertiary" onClick={closeModal}>
            Close
          </Button>
          <Button onClick={addToCart}>Add to Cart</Button>
        </div>
      </>,
    );
  };

  return (
    <div className="flex flex-col flex-1 gap-2">
      <div className="flex flex-1 flex-col gap-2">
        <H4>{formatCurrency(config.price)}</H4>
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
      </div>
      <div className="flex justify-end">
        <Button onClick={addToCart} title="Add to Cart">
          <Icon path={mdiPlus} size={0.75} />
        </Button>
      </div>
    </div>
  );
};
