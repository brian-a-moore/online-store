import {
  CreateSuperuserAdminBody,
  CreateSuperuserAdminQuery,
  CreateSuperuserAdminResponse,
  DeleteSuperuserAdminBody,
  DeleteSuperuserAdminQuery,
  DeleteSuperuserAdminResponse,
  ResetSuperuserPasswordAdminBody,
  ResetSuperuserPasswordAdminQuery,
  ResetSuperuserPasswordAdminResponse,
  UpdateSuperuserAdminBody,
  UpdateSuperuserAdminQuery,
  UpdateSuperuserAdminResponse,
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
