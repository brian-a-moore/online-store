import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ModalContext } from '../../context/ModalContext';
import { ToastContext } from '../../context/ToastContext';
import { formatCurrency, getTotalPrice } from '../../utils';
import { IconImage } from '../display';
import { Button, Stepper } from '../interactive';
import { H3, H5 } from '../typography';

type Props = {
  isVisible: boolean;
};

export const Cart: React.FC<Props> = ({ isVisible }) => {
  const { items, updateItem, removeItem } = useContext(CartContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const { setToast } = useContext(ToastContext);

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
          <Button variant="tertiary" onClick={closeModal}>
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
      className={`fixed top-20 xl:top-0 right-0 xl:relative flex flex-col gap-4 pb-18 bg-white ${isVisible ? 'w-80' : 'w-0'} shadow-md xl:shadow-none border-r overflow-hidden transition-[width] z-40`}
      style={{ height: 'calc(100vh - 78px)' }}
    >
      <div className="flex flex-col p-4 gap-4 overflow-y-auto w-80" style={{ height: 'calc(100% - 72px)'}}>
        {items.length > 0 ? (
          <>
            {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4">
                  <div className='flex gap-4'>
                    <IconImage image={item?.image} name={item.product.name} rounded={false} size='md' />
                    <div className='flex flex-col flex-1'>
                      <H5 title={item.name} className='text-sm'> {item.name} </H5>
                      <p
                        className="text-sm w-full whitespace-nowrap overflow-ellipsis overflow-hidden mb-4"
                        title={item.product.name}
                      >
                        {item.product.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Stepper item={item} handleQuantityChange={handleQuantityChange} />
                    <p className="flex-1 px-2 text-sm">{formatCurrency(item.quantity * item.price)}</p>
                    <button
                      className="p-2 rounded-full hover:bg-red-100 text-red-500"
                      onClick={() => handleDeleteItem(item.id)}
                      title="Remove Item"
                    >
                      <Icon path={mdiClose} size={0.75} />
                    </button>
                  </div>
                </div>
            ))}
          </>
        ) : (
          <p className="text-sm text-center opacity-50">Your cart is empty</p>
        )}
      </div>
      {items.length ? (
        <div className='absolute bottom-0 right-0 flex items-center justify-between p-4 w-80 border-t z-20'>
          <H5>TOTAL: {formatCurrency(getTotalPrice(items))}</H5>
          <form action="http://localhost:8080/order/checkout" method="POST">
            <Button variant='secondary' type="submit">Checkout</Button>
          </form>
        </div>
      ) : null}
    </div>
  );
};
