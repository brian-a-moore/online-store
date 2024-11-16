import { mdiChevronDown, mdiChevronUp, mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { formatCurrency, getTotalPrice, totalItems } from '../utils';
import { Button, Stepper } from './interactive';

type Props = {};

const Cart: React.FC<Props> = () => {
  const { items, updateItem, removeItem } = useContext(CartContext);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleQuantityChange = (itemId: number, dir: '-' | '+') => {
    const thisItem = items.find((item) => item.itemId === itemId);

    if (thisItem) {
      if (dir === '-' && thisItem.quantity > 1) {
        updateItem(itemId, thisItem.quantity - 1);
      }
      if (dir === '+' && thisItem.quantity < thisItem.maxQuantityPerOrder) {
        updateItem(itemId, thisItem.quantity + 1);
      }
    }
  };

  const handleDeleteItem = (itemId: number) => {
    removeItem(itemId);
  };

  return (
    <div
      className={`fixed flex flex-col right-4 bottom-4 border-[1px] bg-white border-gray-300 z-20 rounded shadow-md overflow-hidden max-h-[60vh] ${isMaximized ? 'w-80' : 'w-auto'} transition-width transition-height`}
    >
      <div className="flex px-4 py-2 gap-4 border-b-2 bg-gray-100 items-center justify-between">
        <p className="font-semibold justify-between">Cart ({totalItems(items)})</p>
        <button onClick={() => setIsMaximized((prevState) => !prevState)}>
          <Icon path={isMaximized ? mdiChevronDown : mdiChevronUp} size={1} />
        </button>
      </div>
      {isMaximized ? (
        <>
          <div className="flex-1 overflow-y-auto ">
            {items.length > 0 ? (
              <>
                {items.map((item) => (
                  <div key={item.itemId} className="flex flex-col gap-2 p-4 items-center">
                    <h1
                      className="font-semibold w-full mb-[-8px] whitespace-nowrap overflow-ellipsis overflow-hidden"
                      title={item.itemName}
                    >
                      {item.itemName}
                    </h1>
                    <h2
                      className="text-sm w-full whitespace-nowrap overflow-ellipsis overflow-hidden"
                      title={item.product.productName}
                    >
                      {item.product.productName}
                    </h2>
                    <Stepper item={item} handleQuantityChange={handleQuantityChange} />
                     <p>{formatCurrency(item.quantity * item.itemPrice)}</p>
                      <Button variant="destructive" onClick={() => handleDeleteItem(item.itemId)} title="Delete Item">
                        <Icon path={mdiDelete} size={0.55} />
                      </Button>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-center opacity-50 p-4">Your cart is empty</p>
            )}
          </div>
          {items.length ? (
            <div className="flex gap-2 border-t-2 bg-gray-100 items-center justify-between px-4 py-2">
              <h1 className="font-semibold">TOTAL: {formatCurrency(getTotalPrice(items))}</h1>
              <form action="http://localhost:8080/create-checkout-session" method="POST">
                <Button type="submit">Checkout</Button>
              </form>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default Cart;
