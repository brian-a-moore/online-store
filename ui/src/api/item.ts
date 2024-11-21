import {
  CreateItemBody,
  CreateItemQuery,
  CreateItemResponse,
  DeleteItemBody,
  DeleteItemQuery,
  DeleteItemResponse,
  UpdateItemBody,
  UpdateItemQuery,
  UpdateItemResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createItem = async (storeId: string, productId: string, newItem: CreateItemBody) => {
  return apiCall<CreateItemBody, CreateItemQuery, CreateItemResponse>({
    url: `/admin/store/${storeId}/product/${productId}/item`,
    method: HTTP_METHOD.POST,
    data: newItem,
  });
};

export const deleteItem = async (storeId: string, productId: string, itemId: string) => {
  return apiCall<DeleteItemBody, DeleteItemQuery, DeleteItemResponse>({
    url: `/admin/store/${storeId}/product/${productId}/item/${itemId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateItem = async (storeId: string, productId: string, itemId: string, itemUpdate: UpdateItemBody) => {
  return apiCall<UpdateItemBody, UpdateItemQuery, UpdateItemResponse>({
    url: `/admin/store/${storeId}/product/${productId}/item/${itemId}`,
    method: HTTP_METHOD.PUT,
    data: itemUpdate,
  });
};
