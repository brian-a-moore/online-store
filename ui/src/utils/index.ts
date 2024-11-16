import { TCartItem } from '../context/CartContext';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const totalItems = (items: TCartItem[]): string => {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  if (totalItems > 99) return '99+';
  return totalItems.toString();
};

export const getTotalPrice = (items: TCartItem[]) => {
  return items.reduce((acc, item) => acc + item.quantity * item.itemPrice, 0);
};
