import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { formatCurrency, getTotalPrice, totalItems } from '../utils';

type Props = {};

const Cart: React.FC<Props> = () => {
  const { items, updateItem, removeItem } = useContext(CartContext);

  const handleQuantityChange = (itemId: number, dir: '-' | '+') => {
    const thisItem = items.find((item) => item.itemId === itemId);


    if (thisItem) {
      if (dir === '-' && thisItem.quantity > 1) {
        updateItem(itemId, thisItem.quantity - 1);
      };
      if (dir === '+' && thisItem.quantity < thisItem.maxQuantityPerOrder) {
        updateItem(itemId, thisItem.quantity + 1);
      };
    };
  };

  const handleDeleteItem = (itemId: number) => {
    removeItem(itemId);
  };

  return (
    <div className='fixed right-4 bottom-4 bg-red-500 z-20 rounded overflow-y-auto max-h-64 w-80'>
      <h1>Cart ({totalItems(items)})</h1>
      {items.length > 0 ? (
        <>
          {items.map((item) => (
            <div key={item.itemId}>
              <h2>
                {item.product.productName}: {item.itemName}
              </h2>
              <p>Price: {formatCurrency(item.quantity * item.itemPrice)}</p>
              <div>
                <button onClick={() => handleQuantityChange(item.itemId, '-')}>-</button>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleQuantityChange(item.itemId, '+')}>+</button>
              </div>
              <div>
                <button onClick={() => handleDeleteItem(item.itemId)}>Delete</button>
              </div>
            </div>
          ))}
          <hr />
          <h1>TOTAL: {formatCurrency(getTotalPrice(items))}</h1>
          <hr />
          <form action="http://localhost:8080/create-checkout-session" method="POST">
            <button type="submit">Checkout</button>
          </form>
        </>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
