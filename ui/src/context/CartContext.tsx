import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TItem, TProduct } from '../api';
import { deleteCart, getCart, saveCart } from '../utils/localStorage';

export type TCartItem = Pick<
  TItem,
  'itemId' | 'itemName' | 'itemPrice' | 'itemImage' | 'productId' | 'maxQuantityPerOrder'
> & {
  product: Pick<TProduct, 'productName'>;
  quantity: number;
};

interface CartContextProps {
  items: TCartItem[];
  addItem: (item: TCartItem) => void;
  updateItem: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
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
    const existingItem = items.find((i) => i.itemId === item.itemId);
    if (existingItem) {
      let updatedItem = { ...existingItem, quantity: existingItem.quantity + item.quantity };
      if (updatedItem.quantity <= existingItem.maxQuantityPerOrder) {
        updateItem(item.itemId, updatedItem.quantity);
      }
      return;
    }
    setItems((prevItems) => [...prevItems, item]);
  };

  // Update the quantity of an item in the cart
  const updateItem = (itemId: number, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.itemId === itemId) {
          return { ...item, quantity };
        }
        return item;
      }),
    );
  };

  // Remove an item from the cart
  const removeItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.itemId !== itemId));
  };

  return <CartContext.Provider value={{ items, addItem, updateItem, removeItem }}>{children}</CartContext.Provider>;
};
