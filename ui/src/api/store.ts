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

export const getStorePublic = async (storeId: string) => {
  return apiCall<any, any, any>({
    url: `/store/${storeId}`,
    method: HTTP_METHOD.GET,
  });
};

export const getStorePrivate = async (storeId: string) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.GET,
  });
};

export const listStoresPublic = async (params: any) => {
  return apiCall<any, any, any>({
    url: `/store/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const listStoresPrivate = async (params: any) => {
  return apiCall<any, any, any>({
    url: `/admin/store/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const updateStore = async (storeId: string, storeUpdate: any) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.PUT,
    data: storeUpdate,
  });
};
