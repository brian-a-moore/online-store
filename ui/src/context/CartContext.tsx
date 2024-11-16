import React, { createContext, useState } from 'react';
import { TItem, TProduct } from '../api';

type TCartItem =Pick<TItem, 'itemId' | 'itemName' | 'itemPrice' | 'itemImage' | 'productId'> & {
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
  const [items, setItems] = useState<TCartItem[]>([]);

  const addItem = (item: TCartItem) => {
    setItems((prevItems) => [...prevItems, item]);
  };

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

  const removeItem = (itemId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.itemId !== itemId));
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
