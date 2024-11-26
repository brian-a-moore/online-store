import { mdiCart, mdiChevronDown, mdiChevronUp, mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { formatCurrency, getTotalPrice, totalItems } from '../../utils';
import { Button, Stepper } from '../interactive';
import { H4, H5 } from '../typography';

type Props = {};

export const Cart: React.FC<Props> = () => {
  const { items, updateItem, removeItem } = useContext(CartContext);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleQuantityChange = (itemId: string, dir: '-' | '+') => {
    const thisItem = items.find((item) => item.id === itemId);

    if (thisItem) {
      if (dir === '-' && thisItem.quantity > 1) {
        updateItem(itemId, thisItem.quantity - 1, false);
      }
      if (dir === '+' && thisItem.quantity < thisItem.maxQuantityPerOrder) {
        updateItem(itemId, thisItem.quantity + 1, false);
      }
    }
  };

  const handleDeleteItem = (itemId: string) => {
    removeItem(itemId);
  };

  return (
    <div
      className={`fixed flex flex-col flex-1 p-0 gap-0 right-4 bottom-4 z-20 overflow-hidden max-h-[60vh] ${isMaximized ? 'w-96' : 'w-auto'} bg-white border-[1px] border-gray-300 rounded shadow-md`}
    >
      <div className="flex px-4 py-2 gap-4 border-b-2 bg-gray-100 items-center justify-between">
        <div className='flex gap-2 items-center'>
          <Icon path={mdiCart} size={0.75} color='#64748B' />
          <H4 className="justify-between">Cart ({totalItems(items)})</H4>
        </div>
        <button onClick={() => setIsMaximized((prevState) => !prevState)}>
          <Icon path={isMaximized ? mdiChevronDown : mdiChevronUp} size={1} />
        </button>
      </div>
      {isMaximized ? (
        <>
          <div className="flex flex-col flex-1 p-4 gap-4 overflow-y-auto">
            {items.length > 0 ? (
              <>
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col border-b-2 pb-4">
                    <H5 title={item.name}> {item.name} </H5>
                    <p
                      className="text-sm w-full whitespace-nowrap overflow-ellipsis overflow-hidden mb-4"
                      title={item.product.name}
                    >
                      {item.product.name}
                    </p>
                    <div className="flex gap-2 items-center">
                      <Stepper item={item} handleQuantityChange={handleQuantityChange} />
                      <p className="flex-1 px-2">{formatCurrency(item.quantity * item.price)}</p>
                      <Button
                        className="opacity-30 hover:opacity-100"
                        variant="destructive"
                        onClick={() => handleDeleteItem(item.id)}
                        title="Delete Item"
                      >
                        <Icon path={mdiDelete} size={0.75} />
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-center opacity-50">Your cart is empty</p>
            )}
          </div>
          {items.length ? (
            <div className="flex gap-2 border-t-2 bg-gray-100 items-center justify-between px-4 py-2">
              <H5>TOTAL: {formatCurrency(getTotalPrice(items))}</H5>
              <form action="http://localhost:8080/order/checkout" method="POST">
                <Button type="submit">Checkout</Button>
              </form>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};
