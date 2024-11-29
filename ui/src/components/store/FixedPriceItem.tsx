import { useState } from "react";
import { FixedItemConfig } from "../../../../api/src/types/itemConfigs";
import { TCartItem } from "../../context/CartContext";
import { Item } from "../../pages/public";
import { formatCurrency } from "../../utils";
import { Button, Stepper } from "../interactive";

type Props = {
    item: Item;
    addItemToCart: (item: TCartItem) => void;
};

export const FixedPriceItem: React.FC<Props> = ({
  item,
  addItemToCart,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const config: FixedItemConfig = JSON.parse(item.config);

  // @ts-ignore
  const handleQuantityChange = (itemId: string, dir: '-' | '+') => {
    if (dir === '-' && quantity > 1) {
      setQuantity((prevState) => prevState - 1);
    }
    if (dir === '+' && quantity < item.maxQuantityPerOrder) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-semibold">{formatCurrency(config.price)}</p>
        <Stepper item={{ ...item, quantity }} handleQuantityChange={handleQuantityChange} />
      </div>
      <Button
        onClick={() => {
          addItemToCart({
            id: item.id,
            name: item.name,
            product: item.product,
            price: config.price,
            quantity,
            maxQuantityPerOrder: item.maxQuantityPerOrder,
          });
          setQuantity(1);
        }}
      >
        Add to Cart
      </Button>
    </>
  );
};
