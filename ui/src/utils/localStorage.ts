import { AUTH_TOKEN } from '../constants';

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const getCart = (storeId: string): string | null => {
  return localStorage.getItem(storeId);
};

export const saveAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN, token);
};

export const saveCart = (storeId: string, cart: string): void => {
  localStorage.setItem(storeId, cart);
};

export const deleteAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const deleteCart = (storeId: string): void => {
  localStorage.removeItem(storeId);
};
