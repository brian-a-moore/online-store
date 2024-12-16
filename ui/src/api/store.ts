import {
  CreateStoreAdminBody,
  CreateStoreAdminQuery,
  CreateStoreAdminResponse,
  DeleteStoreAdminBody,
  DeleteStoreAdminQuery,
  DeleteStoreAdminResponse,
  GetStoreAdminBody,
  GetStoreAdminQuery,
  GetStoreAdminResponse,
  GetStoreDashboardBody,
  GetStoreDashboardQuery,
  GetStoreDashboardResponse,
  GetStorePublicBody,
  GetStorePublicQuery,
  GetStorePublicResponse,
  GetStoreTeamDashboardBody,
  GetStoreTeamDashboardQuery,
  GetStoreTeamDashboardResponse,
  ListStoresAdminBody,
  ListStoresAdminQuery,
  ListStoresAdminResponse,
  ListStoresDashboardBody,
  ListStoresDashboardParams,
  ListStoresDashboardResponse,
  ListStoresPublicBody,
  ListStoresPublicQuery,
  ListStoresPublicResponse,
  UpdateStoreAdminBody,
  UpdateStoreAdminQuery,
  UpdateStoreAdminResponse,
  UpdateStoreDashboardBody,
  UpdateStoreDashboardQuery,
  UpdateStoreDashboardResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createStoreAdmin = async (store: CreateStoreAdminBody) => {
  return apiCall<
    CreateStoreAdminBody,
    CreateStoreAdminQuery,
    CreateStoreAdminResponse
  >({
    url: '/admin/store',
    method: HTTP_METHOD.POST,
    data: store,
  });
};

export const deleteStoreAdmin = async (storeId: string) => {
  return apiCall<
    DeleteStoreAdminBody,
    DeleteStoreAdminQuery,
    DeleteStoreAdminResponse
  >({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const getStoreAdmin = async (storeId?: string) => {
  if (storeId) {
    return apiCall<
      GetStoreAdminBody,
      GetStoreAdminQuery,
      GetStoreAdminResponse
    >({
      method: HTTP_METHOD.GET,
      url: `/admin/store/${storeId}`,
    });
  }
};

export const getStoreDashboard = async (storeId?: string) => {
  if (storeId) {
    return apiCall<
      GetStoreDashboardBody,
      GetStoreDashboardQuery,
      GetStoreDashboardResponse
    >({
      url: `/dashboard/store/${storeId}`,
      method: HTTP_METHOD.GET,
    });
  }
};

export const getStorePublic = async (storeId: string) => {
  const controller = new AbortController();
  return apiCall<
    GetStorePublicBody,
    GetStorePublicQuery,
    GetStorePublicResponse
  >(
    {
      url: `/public/store/${storeId}`,
      method: HTTP_METHOD.GET,
    },
    controller,
    false,
  );
};

export const getTeamDashboard = async (
  storeId: string,
  params: GetStoreTeamDashboardQuery,
) => {
  return apiCall<
    GetStoreTeamDashboardBody,
    GetStoreTeamDashboardQuery,
    GetStoreTeamDashboardResponse
  >({
    url: `/dashboard/store/${storeId}/team`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const listStoresAdmin = async (params: ListStoresAdminQuery) => {
  return apiCall<
    ListStoresAdminBody,
    ListStoresAdminQuery,
    ListStoresAdminResponse
  >({
    url: `/admin/store/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const listStoresDashboard = async (
  params: ListStoresDashboardParams,
) => {
  return apiCall<
    ListStoresDashboardBody,
    ListStoresDashboardParams,
    ListStoresDashboardResponse
  >({
    url: `/dashboard/store/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const listStoresPublic = async (params: ListStoresPublicQuery) => {
  const controller = new AbortController();
  return apiCall<
    ListStoresPublicBody,
    ListStoresPublicQuery,
    ListStoresPublicResponse
  >(
    {
      url: `/public/store/list`,
      method: HTTP_METHOD.GET,
      params,
    },
    controller,
    false,
  );
};

export const updateStoreAdmin = async (
  storeId: string,
  storeUpdate: UpdateStoreAdminBody,
) => {
  return apiCall<
    UpdateStoreAdminBody,
    UpdateStoreAdminQuery,
    UpdateStoreAdminResponse
  >({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.PUT,
    data: storeUpdate,
  });
};

export const updateStoreDashboard = async (
  storeId: string,
  storeUpdate: UpdateStoreDashboardBody,
) => {
  return apiCall<
    UpdateStoreDashboardBody,
    UpdateStoreDashboardQuery,
    UpdateStoreDashboardResponse
  >({
    url: `/dashboard/store/${storeId}`,
    method: HTTP_METHOD.PUT,
    data: storeUpdate,
  });
};
