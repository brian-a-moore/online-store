import {
  CreateSuperuserAdminBody,
  CreateSuperuserAdminQuery,
  CreateSuperuserAdminResponse,
  CreateUserAdminBody,
  CreateUserAdminQuery,
  CreateUserAdminResponse,
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
