import {
  CreateItemDashboardBody,
  CreateItemDashboardQuery,
  CreateItemDashboardResponse,
  DeleteItemDashboardBody,
  DeleteItemDashboardQuery,
  DeleteItemDashboardResponse,
  UpdateItemDashboardBody,
  UpdateItemDashboardQuery,
  UpdateItemDashboardResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createItem = async (productId: string, newItem: CreateItemDashboardBody) => {
  return apiCall<CreateItemDashboardBody, CreateItemDashboardQuery, CreateItemDashboardResponse>({
    url: `/dashboard/item`,
    method: HTTP_METHOD.POST,
    data: newItem,
    params: { productId },
  });
};

export const deleteItem = async (itemId: string) => {
  return apiCall<DeleteItemDashboardBody, DeleteItemDashboardQuery, DeleteItemDashboardResponse>({
    url: `/dashboard/item/${itemId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateItem = async (itemId: string, itemUpdate: UpdateItemDashboardBody) => {
  return apiCall<UpdateItemDashboardBody, UpdateItemDashboardQuery, UpdateItemDashboardResponse>({
    url: `/dashboard/item/${itemId}`,
    method: HTTP_METHOD.PUT,
    data: itemUpdate,
  });
};
