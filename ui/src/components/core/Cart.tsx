import { mdiCart, mdiChevronDown, mdiChevronUp, mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { ModalContext } from '../../context/ModalContext';
import { ToastContext } from '../../context/ToastContext';
import { formatCurrency, getTotalPrice, totalItems } from '../../utils';
import { Separator } from '../display';
import { Button, Stepper } from '../interactive';
import { H3, H4, H5 } from '../typography';

type Props = {};

export const Cart: React.FC<Props> = () => {
  const { items, updateItem, removeItem } = useContext(CartContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);
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
    openModal(
      <>
        <H3>Remove Item</H3>
        <p>Are you sure you want to remove this item from your cart?</p>
        <div className="flex justify-between">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              removeItem(itemId);
              closeModal();
              setToast({ message: 'Item removed from cart', type: 'success' });
            }}
          >
            Remove Item
          </Button>
        </div>
      </>,
    );
  };

  return (
    <div
      className={`fixed flex flex-col flex-1 p-0 gap-0 right-4 bottom-4 z-20 overflow-hidden max-h-[60vh] ${isMaximized ? 'w-96' : 'w-auto'} bg-white border-[1px] border-slate-300 rounded shadow-md`}
    >
      <div className="flex px-4 py-2 gap-4 bg-slate-100 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Icon path={mdiCart} size={0.75} color="#64748B" />
          <H4 className="justify-between">Cart ({totalItems(items)})</H4>
        </div>
        <button onClick={() => setIsMaximized((prevState) => !prevState)}>
          <Icon path={isMaximized ? mdiChevronDown : mdiChevronUp} size={1} />
        </button>
      </div>
      <Separator />
      {isMaximized ? (
        <>
          <div className="flex flex-col flex-1 p-4 gap-4 overflow-y-auto">
            {items.length > 0 ? (
              <>
                {items.map((item) => (
                  <div className="flex flex-col">
                    <div key={item.id} className="flex flex-col pb-4">
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
                          variant="secondary"
                          onClick={() => handleDeleteItem(item.id)}
                          title="Remove Item"
                        >
                          <Icon path={mdiDelete} size={0.75} />
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </>
            ) : (
              <p className="text-sm text-center opacity-50">Your cart is empty</p>
            )}
          </div>
          {items.length ? (
            <>
              <Separator />
              <div className="flex gap-2 bg-slate-100 items-center justify-between px-4 py-2">
                <H5>TOTAL: {formatCurrency(getTotalPrice(items))}</H5>
                <form action="http://localhost:8080/order/checkout" method="POST">
                  <Button type="submit">Checkout</Button>
                </form>
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};
