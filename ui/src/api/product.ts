import {
  CreateProductDashboardBody,
  CreateProductDashboardQuery,
  CreateProductDashboardResponse,
  DeleteProductAdminBody,
  DeleteProductAdminQuery,
  DeleteProductAdminResponse,
  DeleteProductDashboardBody,
  DeleteProductDashboardQuery,
  DeleteProductDashboardResponse,
  GetProductAdminBody,
  GetProductAdminQuery,
  GetProductAdminResponse,
  GetProductDashboardBody,
  GetProductDashboardQuery,
  GetProductDashboardResponse,
  ListProductsAdminBody,
  ListProductsAdminQuery,
  ListProductsAdminResponse,
  ListProductsDashboardBody,
  ListProductsDashboardQuery,
  ListProductsDashboardResponse,
  ListProductsPublicBody,
  ListProductsPublicQuery,
  ListProductsPublicResponse,
  UpdateProductAdminBody,
  UpdateProductAdminQuery,
  UpdateProductAdminResponse,
  UpdateProductDashboardBody,
  UpdateProductDashboardQuery,
  UpdateProductDashboardResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createProductDashboard = async (
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

export const deleteProductAdmin = async (productId: string) => {
  return apiCall<
    DeleteProductAdminBody,
    DeleteProductAdminQuery,
    DeleteProductAdminResponse
  >({
    url: `/admin/product/${productId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const deleteProductDashboard = async (productId: string) => {
  return apiCall<
    DeleteProductDashboardBody,
    DeleteProductDashboardQuery,
    DeleteProductDashboardResponse
  >({
    url: `/dashboard/product/${productId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const getProductAdmin = async (productId?: string) => {
  if (productId) {
    return apiCall<
      GetProductAdminBody,
      GetProductAdminQuery,
      GetProductAdminResponse
    >({
      method: HTTP_METHOD.GET,
      url: `/admin/product/${productId}`,
    });
  }
};

export const getProductDashboard = async (productId?: string) => {
  if (productId) {
    return apiCall<
      GetProductDashboardBody,
      GetProductDashboardQuery,
      GetProductDashboardResponse
    >({
      url: `/dashboard/product/${productId}`,
      method: HTTP_METHOD.GET,
    });
  }
};

export const listProductsAdmin = async (params: ListProductsAdminQuery) => {
  return apiCall<
    ListProductsAdminBody,
    ListProductsAdminQuery,
    ListProductsAdminResponse
  >({
    url: `/admin/product/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const listProductsDashboard = async (
  params: ListProductsDashboardQuery,
) => {
  return apiCall<
    ListProductsDashboardBody,
    ListProductsDashboardQuery,
    ListProductsDashboardResponse
  >({
    url: `/dashboard/product/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const listProductsPublic = async (params: ListProductsPublicQuery) => {
  const controller = new AbortController();
  return apiCall<
    ListProductsPublicBody,
    ListProductsPublicQuery,
    ListProductsPublicResponse
  >(
    {
      url: `/public/product/list`,
      method: HTTP_METHOD.GET,
      params,
    },
    controller,
    false,
  );
};

export const updateProductAdmin = async ({
  productId,
  productUpdate,
}: {
  productId: string;
  productUpdate: UpdateProductAdminBody;
}) => {
  return apiCall<
    UpdateProductAdminBody,
    UpdateProductAdminQuery,
    UpdateProductAdminResponse
  >({
    url: `/admin/product/${productId}`,
    method: HTTP_METHOD.PUT,
    data: productUpdate,
  });
};

export const updateProductDashboard = async (
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
