import {
  CreateStoreAdminBody,
  CreateStoreAdminQuery,
  CreateStoreAdminResponse,
  CreateSuperuserAdminBody,
  CreateSuperuserAdminQuery,
  CreateSuperuserAdminResponse,
  CreateUserAdminBody,
  CreateUserAdminQuery,
  CreateUserAdminResponse,
  DeleteItemAdminBody,
  DeleteItemAdminQuery,
  DeleteItemAdminResponse,
  DeleteProductAdminBody,
  DeleteProductAdminQuery,
  DeleteProductAdminResponse,
  DeleteStoreAdminBody,
  DeleteStoreAdminQuery,
  DeleteStoreAdminResponse,
  DeleteSuperuserAdminBody,
  DeleteSuperuserAdminQuery,
  DeleteSuperuserAdminResponse,
  DeleteUserAdminBody,
  DeleteUserAdminQuery,
  DeleteUserAdminResponse,
  ResetSuperuserPasswordAdminBody,
  ResetSuperuserPasswordAdminQuery,
  ResetSuperuserPasswordAdminResponse,
  ResetUserPasswordAdminBody,
  ResetUserPasswordAdminQuery,
  ResetUserPasswordAdminResponse,
  UpdateItemAdminBody,
  UpdateItemAdminQuery,
  UpdateItemAdminResponse,
  UpdateProductAdminBody,
  UpdateProductAdminQuery,
  UpdateProductAdminResponse,
  UpdateStoreAdminBody,
  UpdateStoreAdminQuery,
  UpdateStoreAdminResponse,
  UpdateSuperuserAdminBody,
  UpdateSuperuserAdminQuery,
  UpdateSuperuserAdminResponse,
  UpdateUserAdminBody,
  UpdateUserAdminQuery,
  UpdateUserAdminResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createSuperuser = async (superuser: CreateSuperuserAdminBody) => {
  return apiCall<CreateSuperuserAdminBody, CreateSuperuserAdminQuery, CreateSuperuserAdminResponse>({
    url: '/admin/superuser',
    method: HTTP_METHOD.POST,
    data: superuser,
  });
};

export const updateSuperuser = async (superuserId: string, superuserUpdate: UpdateSuperuserAdminBody) => {
  return apiCall<UpdateSuperuserAdminBody, UpdateSuperuserAdminQuery, UpdateSuperuserAdminResponse>({
    url: `/admin/superuser/${superuserId}`,
    method: HTTP_METHOD.PUT,
    data: superuserUpdate,
  });
};

export const deleteSuperuser = async (superuserId: string) => {
  return apiCall<DeleteSuperuserAdminBody, DeleteSuperuserAdminQuery, DeleteSuperuserAdminResponse>({
    url: `/admin/superuser/${superuserId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const resetSuperuserPassword = async (superuserId: string) => {
  return apiCall<
    ResetSuperuserPasswordAdminBody,
    ResetSuperuserPasswordAdminQuery,
    ResetSuperuserPasswordAdminResponse
  >({
    url: `/admin/superuser/${superuserId}/password_reset`,
    method: HTTP_METHOD.GET,
  });
};

export const createUser = async (user: CreateUserAdminBody) => {
  return apiCall<CreateUserAdminBody, CreateUserAdminQuery, CreateUserAdminResponse>({
    url: '/admin/user',
    method: HTTP_METHOD.POST,
    data: user,
  });
};

export const updateUser = async (userId: string, userUpdate: UpdateUserAdminBody) => {
  return apiCall<UpdateSuperuserAdminBody, UpdateUserAdminQuery, UpdateUserAdminResponse>({
    url: `/admin/user/${userId}`,
    method: HTTP_METHOD.PUT,
    data: userUpdate,
  });
};

export const deleteUser = async (userId: string) => {
  return apiCall<DeleteUserAdminBody, DeleteUserAdminQuery, DeleteUserAdminResponse>({
    url: `/admin/user/${userId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const resetUserPassword = async (userId: string) => {
  return apiCall<ResetUserPasswordAdminBody, ResetUserPasswordAdminQuery, ResetUserPasswordAdminResponse>({
    url: `/admin/user/${userId}/password_reset`,
    method: HTTP_METHOD.GET,
  });
};

export const createStore = async (store: CreateStoreAdminBody) => {
  return apiCall<CreateStoreAdminBody, CreateStoreAdminQuery, CreateStoreAdminResponse>({
    url: '/admin/store',
    method: HTTP_METHOD.POST,
    data: store,
  });
};

export const updateStore = async (storeId: string, storeUpdate: UpdateStoreAdminBody) => {
  return apiCall<UpdateStoreAdminBody, UpdateStoreAdminQuery, UpdateStoreAdminResponse>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.PUT,
    data: storeUpdate,
  });
};

export const deleteStore = async (storeId: string) => {
  return apiCall<DeleteStoreAdminBody, DeleteStoreAdminQuery, DeleteStoreAdminResponse>({
    url: `/admin/store/${storeId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateProduct = async (productId: string, productUpdate: UpdateProductAdminBody) => {
  return apiCall<UpdateProductAdminBody, UpdateProductAdminQuery, UpdateProductAdminResponse>({
    url: `/admin/product/${productId}`,
    method: HTTP_METHOD.PUT,
    data: productUpdate,
  });
};

export const deleteProduct = async (productId: string) => {
  return apiCall<DeleteProductAdminBody, DeleteProductAdminQuery, DeleteProductAdminResponse>({
    url: `/admin/product/${productId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateItem = async (itemId: string, itemUpdate: UpdateItemAdminBody) => {
  return apiCall<UpdateItemAdminBody, UpdateItemAdminQuery, UpdateItemAdminResponse>({
    url: `/admin/item/${itemId}`,
    method: HTTP_METHOD.PUT,
    data: itemUpdate,
  });
};

export const deleteItem = async (itemId: string) => {
  return apiCall<DeleteItemAdminBody, DeleteItemAdminQuery, DeleteItemAdminResponse>({
    url: `/admin/item/${itemId}`,
    method: HTTP_METHOD.DELETE,
  });
};
