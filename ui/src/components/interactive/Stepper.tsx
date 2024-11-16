import { mdiMinus, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { TItem } from '../../api';
import { TCartItem } from '../../context/CartContext';
import { Button } from '../interactive';

type Props = {
    item: (TItem | TCartItem) & { quantity: number };
    handleQuantityChange: (itemId: number, dir: '-' | '+') => void;
};

export const Stepper: React.FC<Props> = ({ item, handleQuantityChange  }) => {
    return (
        <div className="flex gap-4 items-center">
            <Button
            variant="secondary"
            onClick={() => handleQuantityChange(item.itemId, '-')}
            title="Remove One"
            >
            <Icon path={mdiMinus} size={0.55} />
            </Button>
            <p title={`Current quantity: ${item.quantity}`}>{item.quantity}</p>
            <Button
            variant="secondary"
            onClick={() => handleQuantityChange(item.itemId, '+')}
            title="Add One"
            >
            <Icon path={mdiPlus} size={0.55} />
            </Button>
        </div>
    );
};
