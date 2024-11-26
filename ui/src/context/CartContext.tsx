import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteCart, getCart, saveCart } from '../utils/localStorage';
import { ToastContext } from './ToastContext';

export type TCartItem = {
  id: string;
  name: string;
  product: { name: string };
  price: number;
  maxQuantityPerOrder: number;
  quantity: number;
};

interface CartContextProps {
  items: TCartItem[];
  addItem: (item: TCartItem) => void;
  updateItem: (itemId: string, quantity: number, shouldNotify: boolean) => void;
  removeItem: (itemId: string) => void;
}

const DEFAULT_CONTEXT: CartContextProps = {
  items: [],
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
};

export const CartContext = createContext<CartContextProps>(DEFAULT_CONTEXT);

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const { storeId } = useParams<{ storeId: string }>();
  const { setToast } = useContext(ToastContext);

  const [items, setItems] = useState<TCartItem[]>([]);

  // Check for an existing cart in local storage
  useEffect(() => {
    const existingCart = getCart(storeId!);
    if (existingCart) setItems(JSON.parse(existingCart));
  }, []);

  // Update/Delete the cart in local storage on every change
  useEffect(() => {
    saveCart(storeId!.toString(), JSON.stringify(items));
    if (items.length === 0) {
      deleteCart(storeId!);
    }
  }, [JSON.stringify(items)]);

  // Add an item to the cart but update item if it already exists
  const addItem = (item: TCartItem) => {
    const existingItem = items.find((i) => i.id === item.id);
    if (existingItem) {
      let updatedItem = { ...existingItem, quantity: existingItem.quantity + item.quantity };
      if (updatedItem.quantity <= existingItem.maxQuantityPerOrder) {
        updateItem(item.id, updatedItem.quantity, true);
      } else {
        setToast({ type: 'info', message: 'Max quantity per order reached' });
      }
      return;
    }
    setItems((prevItems) => [...prevItems, item]);
    setToast({ type: 'success', message: 'Item(s) added to your cart' });
  };

  // Update the quantity of an item in the cart
  const updateItem = (itemId: string, quantity: number, shouldNotify: boolean) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity };
        }
        return item;
      }),
    );
    if (shouldNotify) setToast({ type: 'success', message: 'Item quantity updated in cart' });
  };

  // Remove an item from the cart
  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return <CartContext.Provider value={{ items, addItem, updateItem, removeItem }}>{children}</CartContext.Provider>;
};
