import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createProduct = async (storeId: string, newProduct: any) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}/product`,
    method: HTTP_METHOD.POST,
    data: newProduct,
  });
};

export const deleteProduct = async (storeId: string, productId: string) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}/product/${productId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const getProductPublic = async (storeId: string, productId: string) => {
  return apiCall<any, any, any>({
    url: `/store/${storeId}/product/${productId}`,
    method: HTTP_METHOD.GET,
  });
};

export const getProductPrivate = async (storeId: string, productId: string) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}/product/${productId}`,
    method: HTTP_METHOD.GET,
  });
};

export const listProductsPublic = async (storeId: string, params: any) => {
  return apiCall<any, any, any>({
    url: `/store/${storeId}/product/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const listProductsPrivate = async (storeId: string, params: any) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}/product/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const updateProduct = async (storeId: string, productId: string, productUpdate: any) => {
  return apiCall<any, any, any>({
    url: `/admin/store/${storeId}/product/${productId}`,
    method: HTTP_METHOD.PUT,
    data: productUpdate,
  });
};
