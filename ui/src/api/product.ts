import {
  CreateProductBody,
  CreateProductQuery,
  CreateProductResponse,
  DeleteProductBody,
  DeleteProductQuery,
  DeleteProductResponse,
  UpdateProductBody,
  UpdateProductQuery,
  UpdateProductResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createProduct = async (storeId: string, newProduct: CreateProductBody) => {
  return apiCall<CreateProductBody, CreateProductQuery, CreateProductResponse>({
    url: `/admin/store/${storeId}/product`,
    method: HTTP_METHOD.POST,
    data: newProduct,
  });
};

export const deleteProduct = async (storeId: string, productId: string) => {
  return apiCall<DeleteProductBody, DeleteProductQuery, DeleteProductResponse>({
    url: `/admin/store/${storeId}/product/${productId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateProduct = async (storeId: string, productId: string, productUpdate: UpdateProductBody) => {
  return apiCall<UpdateProductBody, UpdateProductQuery, UpdateProductResponse>({
    url: `/admin/store/${storeId}/product/${productId}`,
    method: HTTP_METHOD.PUT,
    data: productUpdate,
  });
};
