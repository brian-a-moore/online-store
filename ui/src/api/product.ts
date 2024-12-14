import {
  CreateProductDashboardBody,
  CreateProductDashboardQuery,
  CreateProductDashboardResponse,
  DeleteProductDashboardBody,
  DeleteProductDashboardQuery,
  DeleteProductDashboardResponse,
  UpdateProductDashboardBody,
  UpdateProductDashboardQuery,
  UpdateProductDashboardResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createProduct = async (
  storeId: string,
  newProduct: CreateProductDashboardBody,
) => {
  return apiCall<
    CreateProductDashboardBody,
    CreateProductDashboardQuery,
    CreateProductDashboardResponse
  >({
    url: `/dashboard/product`,
    method: HTTP_METHOD.POST,
    data: newProduct,
    params: { storeId },
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

export const updateProduct = async (
  productId: string,
  productUpdate: UpdateProductDashboardBody,
) => {
  return apiCall<
    UpdateProductDashboardBody,
    UpdateProductDashboardQuery,
    UpdateProductDashboardResponse
  >({
    url: `/dashboard/product/${productId}`,
    method: HTTP_METHOD.PUT,
    data: productUpdate,
  });
};
