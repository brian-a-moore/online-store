import {
  CreateProductDashboardBody,
  UpdateProductDashboardBody,
  UpdateProductDashboardQuery,
  UpdateProductDashboardResponse,
  UpdateStoreDashboardBody,
  UpdateStoreDashboardQuery,
  UpdateStoreDashboardResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const updateStore = async (storeId: string, store: UpdateStoreDashboardBody): Promise<void> => {
  return apiCall<UpdateStoreDashboardBody, UpdateStoreDashboardQuery, UpdateStoreDashboardResponse>({
    url: `/dashboard/store/${storeId}`,
    method: HTTP_METHOD.PUT,
    data: store,
  });
};

export const createProduct = async (storeId: string, product: CreateProductDashboardBody): Promise<void> => {
  return apiCall<UpdateStoreDashboardBody, UpdateStoreDashboardQuery, UpdateStoreDashboardResponse>({
    url: `/dashboard/product`,
    method: HTTP_METHOD.POST,
    data: product,
    params: { storeId },
  });
};

export const updateProduct = async (productId: string, product: UpdateProductDashboardBody): Promise<void> => {
  return apiCall<UpdateProductDashboardBody, UpdateProductDashboardQuery, UpdateProductDashboardResponse>({
    url: `/dashboard/product/${productId}`,
    method: HTTP_METHOD.PUT,
    data: product,
  });
};
