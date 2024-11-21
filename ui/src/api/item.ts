import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createItem = async (storeId: string, productId: string, newItem: any) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}/product/${productId}/item`,
    method: HTTP_METHOD.POST,
    data: newItem,
  });
};

export const deleteItem = async (storeId: string, productId: string, itemId: string) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}/product/${productId}/item/${itemId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateItem = async (storeId: string, productId: string, itemId: string, itemUpdate: any) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}/product/${productId}/item/${itemId}`,
    method: HTTP_METHOD.PUT,
    data: itemUpdate,
  });
};
