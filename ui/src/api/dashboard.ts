import {
  AddStoreRelationDashboardBody,
  AddStoreRelationDashboardQuery,
  AddStoreRelationDashboardResponse,
  CreateItemDashboardBody,
  CreateItemDashboardQuery,
  CreateItemDashboardResponse,
  CreateProductDashboardBody,
  CreateProductDashboardQuery,
  CreateProductDashboardResponse,
  DeleteItemDashboardBody,
  DeleteItemDashboardQuery,
  DeleteItemDashboardResponse,
  DeleteProductDashboardBody,
  DeleteProductDashboardQuery,
  DeleteProductDashboardResponse,
  DeleteStoreRelationDashboardBody,
  DeleteStoreRelationDashboardQuery,
  DeleteStoreRelationDashboardResponse,
  UpdateItemDashboardBody,
  UpdateItemDashboardQuery,
  UpdateItemDashboardResponse,
  UpdateProductDashboardBody,
  UpdateProductDashboardQuery,
  UpdateProductDashboardResponse,
  UpdateStoreDashboardBody,
  UpdateStoreDashboardQuery,
  UpdateStoreDashboardResponse,
  UpdateStoreRelationDashboardBody,
  UpdateStoreRelationDashboardQuery,
  UpdateStoreRelationDashboardResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const updateStore = async (
  storeId: string,
  store: UpdateStoreDashboardBody,
): Promise<void> => {
  return apiCall<
    UpdateStoreDashboardBody,
    UpdateStoreDashboardQuery,
    UpdateStoreDashboardResponse
  >({
    url: `/dashboard/store/${storeId}`,
    method: HTTP_METHOD.PUT,
    data: store,
  });
};

export const createProduct = async (
  storeId: string,
  product: CreateProductDashboardBody,
) => {
  return apiCall<
    CreateProductDashboardBody,
    CreateProductDashboardQuery,
    CreateProductDashboardResponse
  >({
    url: `/dashboard/product`,
    method: HTTP_METHOD.POST,
    data: product,
    params: { storeId },
  });
};

export const updateProduct = async (
  productId: string,
  product: UpdateProductDashboardBody,
): Promise<void> => {
  return apiCall<
    UpdateProductDashboardBody,
    UpdateProductDashboardQuery,
    UpdateProductDashboardResponse
  >({
    url: `/dashboard/product/${productId}`,
    method: HTTP_METHOD.PUT,
    data: product,
  });
};

export const deleteProduct = async (productId: string) => {
  return apiCall<
    DeleteProductDashboardBody,
    DeleteProductDashboardQuery,
    DeleteProductDashboardResponse
  >({
    url: `/dashboard/product/${productId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const addStoreRelation = async (
  relation: AddStoreRelationDashboardBody,
) => {
  return apiCall<
    AddStoreRelationDashboardBody,
    AddStoreRelationDashboardQuery,
    AddStoreRelationDashboardResponse
  >({
    url: `/dashboard/relation`,
    method: HTTP_METHOD.POST,
    data: relation,
  });
};

export const updateStoreRelation = async (
  relationId: string,
  roleId: number,
) => {
  return apiCall<
    UpdateStoreRelationDashboardBody,
    UpdateStoreRelationDashboardQuery,
    UpdateStoreRelationDashboardResponse
  >({
    url: `/dashboard/relation/${relationId}`,
    method: HTTP_METHOD.PUT,
    data: { roleId },
  });
};

export const deleteStoreRelation = async (relationId: string) => {
  return apiCall<
    DeleteStoreRelationDashboardBody,
    DeleteStoreRelationDashboardQuery,
    DeleteStoreRelationDashboardResponse
  >({
    url: `/dashboard/relation/${relationId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const createItem = async (
  productId: string,
  item: CreateItemDashboardBody,
) => {
  return apiCall<
    CreateItemDashboardBody,
    CreateItemDashboardQuery,
    CreateItemDashboardResponse
  >({
    url: `/dashboard/item`,
    method: HTTP_METHOD.POST,
    data: item,
    params: { productId },
  });
};

export const updateItem = async (
  itemId: string,
  itemUpdate: UpdateItemDashboardBody,
) => {
  return apiCall<
    UpdateItemDashboardBody,
    UpdateItemDashboardQuery,
    UpdateItemDashboardResponse
  >({
    url: `/dashboard/item/${itemId}`,
    method: HTTP_METHOD.PUT,
    data: itemUpdate,
  });
};

export const deleteItem = async (itemId: string) => {
  return apiCall<
    DeleteItemDashboardBody,
    DeleteItemDashboardQuery,
    DeleteItemDashboardResponse
  >({
    url: `/dashboard/item/${itemId}`,
    method: HTTP_METHOD.DELETE,
  });
};
