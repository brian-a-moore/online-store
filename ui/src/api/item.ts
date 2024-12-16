import {
  CreateItemDashboardBody,
  CreateItemDashboardQuery,
  CreateItemDashboardResponse,
  DeleteItemAdminBody,
  DeleteItemAdminQuery,
  DeleteItemAdminResponse,
  DeleteItemDashboardBody,
  DeleteItemDashboardQuery,
  DeleteItemDashboardResponse,
  GetItemAdminBody,
  GetItemAdminQuery,
  GetItemAdminResponse,
  GetItemDashboardBody,
  GetItemDashboardQuery,
  GetItemDashboardResponse,
  ListItemsAdminBody,
  ListItemsAdminQuery,
  ListItemsAdminResponse,
  ListItemsDashboardBody,
  ListItemsDashboardQuery,
  ListItemsDashboardResponse,
  ListItemsPublicBody,
  ListItemsPublicQuery,
  ListItemsPublicResponse,
  UpdateItemAdminBody,
  UpdateItemAdminQuery,
  UpdateItemAdminResponse,
  UpdateItemDashboardBody,
  UpdateItemDashboardQuery,
  UpdateItemDashboardResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createItemDashboard = async ({
  productId,
  newItem,
}: {
  productId: string;
  newItem: CreateItemDashboardBody;
}) => {
  return apiCall<
    CreateItemDashboardBody,
    CreateItemDashboardQuery,
    CreateItemDashboardResponse
  >({
    url: `/dashboard/item`,
    method: HTTP_METHOD.POST,
    data: newItem,
    params: { productId },
  });
};

export const deleteItemAdmin = async (itemId: string) => {
  return apiCall<
    DeleteItemAdminBody,
    DeleteItemAdminQuery,
    DeleteItemAdminResponse
  >({
    url: `/admin/item/${itemId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const deleteItemDashboard = async (itemId: string) => {
  return apiCall<
    DeleteItemDashboardBody,
    DeleteItemDashboardQuery,
    DeleteItemDashboardResponse
  >({
    url: `/dashboard/item/${itemId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const getItemAdmin = async (itemId?: string) => {
  if (itemId) {
    return apiCall<GetItemAdminBody, GetItemAdminQuery, GetItemAdminResponse>({
      method: HTTP_METHOD.GET,
      url: `/admin/item/${itemId}`,
    });
  }
};

export const getItemDashboard = async (itemId?: string) => {
  if (itemId) {
    return apiCall<
      GetItemDashboardBody,
      GetItemDashboardQuery,
      GetItemDashboardResponse
    >({
      url: `/dashboard/item/${itemId}`,
      method: HTTP_METHOD.GET,
    });
  }
};

export const listItemsAdmin = async (params: ListItemsAdminQuery) => {
  return apiCall<
    ListItemsAdminBody,
    ListItemsAdminQuery,
    ListItemsAdminResponse
  >({
    url: `/admin/item/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const listItemsDashboard = async (params: ListItemsDashboardQuery) => {
  return apiCall<
    ListItemsDashboardBody,
    ListItemsDashboardQuery,
    ListItemsDashboardResponse
  >({
    url: `/dashboard/item/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const listItemsPublic = async (params: ListItemsPublicQuery) => {
  const controller = new AbortController();
  return apiCall<
    ListItemsPublicBody,
    ListItemsPublicQuery,
    ListItemsPublicResponse
  >(
    {
      url: `/public/item/list`,
      method: HTTP_METHOD.GET,
      params,
    },
    controller,
    false,
  );
};

export const updateItemDashboard = async ({
  itemId,
  itemUpdate,
}: {
  itemId: string;
  itemUpdate: UpdateItemDashboardBody;
}) => {
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

export const updateItemAdmin = async ({
  itemId,
  itemUpdate,
}: {
  itemId: string;
  itemUpdate: UpdateItemAdminBody;
}) => {
  return apiCall<
    UpdateItemAdminBody,
    UpdateItemAdminQuery,
    UpdateItemAdminResponse
  >({
    url: `/admin/item/${itemId}`,
    method: HTTP_METHOD.PUT,
    data: itemUpdate,
  });
};
