import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createStore = async (newStore: any) => {
  return apiCall<any, any, any>({
    url: `/admin/store`,
    method: HTTP_METHOD.POST,
    data: newStore,
  });
};

export const deleteStore = async (storeId: string) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateStore = async (storeId: string, storeUpdate: any) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.PUT,
    data: storeUpdate,
  });
};
