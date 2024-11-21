import {
  CreateStoreBody,
  CreateStoreQuery,
  CreateStoreResponse,
  DeleteStoreBody,
  DeleteStoreQuery,
  DeleteStoreResponse,
  UpdateStoreBody,
  UpdateStoreQuery,
  UpdateStoreResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createStore = async (newStore: CreateStoreBody) => {
  return apiCall<CreateStoreBody, CreateStoreQuery, CreateStoreResponse>({
    url: `/admin/store`,
    method: HTTP_METHOD.POST,
    data: newStore,
  });
};

export const deleteStore = async (storeId: string) => {
  return apiCall<DeleteStoreBody, DeleteStoreQuery, DeleteStoreResponse>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateStore = async (storeId: string, storeUpdate: UpdateStoreBody) => {
  return apiCall<UpdateStoreBody, UpdateStoreQuery, UpdateStoreResponse>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.PUT,
    data: storeUpdate,
  });
};
