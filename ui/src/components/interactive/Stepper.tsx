import { mdiMinus, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { TCartItem } from '../../context/CartContext';
import { Item } from '../../pages/public';
import { Button } from '../interactive';

type Props = {
  item: (Item | TCartItem) & { quantity: number };
  handleQuantityChange: (itemId: string, dir: '-' | '+') => void;
};

export const Stepper: React.FC<Props> = ({ item, handleQuantityChange }) => {
  return (
    <div className="flex gap-4 items-center">
      <Button variant="secondary" onClick={() => handleQuantityChange(item.id, '-')} title="Remove One">
        <Icon path={mdiMinus} size={1} />
      </Button>
      <p title={`Current quantity: ${item.quantity}`}>{item.quantity}</p>
      <Button variant="secondary" onClick={() => handleQuantityChange(item.id, '+')} title="Add One">
        <Icon path={mdiPlus} size={1} />
      </Button>
    </div>
  );
};
