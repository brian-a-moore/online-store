import { mdiMinus, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { ListItemsPublicResponse } from '../../../../api/src/types/api';
import { TCartItem } from '../../context/CartContext';
import { Button } from '../interactive';

type Props = {
  item: (ListItemsPublicResponse['items'][0] | TCartItem) & { quantity: number };
  handleQuantityChange: (itemId: string, dir: '-' | '+') => void;
};

export const Stepper: React.FC<Props> = ({ item, handleQuantityChange }) => {
  return (
    <div className="flex gap-2 items-center">
      <Button variant="tertiary" onClick={() => handleQuantityChange(item.id, '-')} title="Remove One">
        <Icon path={mdiMinus} size={0.5} />
      </Button>
      <p className='text-sm' title={`Current quantity: ${item.quantity}`}>{item.quantity}</p>
      <Button variant="tertiary" onClick={() => handleQuantityChange(item.id, '+')} title="Add One">
        <Icon path={mdiPlus} size={0.5} />
      </Button>
    </div>
  );
};
