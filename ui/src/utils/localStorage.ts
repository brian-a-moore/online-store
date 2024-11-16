export const getCart = (storeId: string): string | null => {
  return localStorage.getItem(storeId);
};

export const saveCart = (storeId: string, cart: string): void => {
  localStorage.setItem(storeId, cart);
};

export const deleteCart = (storeId: string): void => {
  localStorage.removeItem(storeId);
};
