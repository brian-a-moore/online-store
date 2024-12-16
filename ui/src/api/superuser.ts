import {
  CreateSuperuserAdminBody,
  CreateSuperuserAdminQuery,
  CreateSuperuserAdminResponse,
  DeleteSuperuserAdminBody,
  DeleteSuperuserAdminQuery,
  DeleteSuperuserAdminResponse,
  GetSuperuserAdminBody,
  GetSuperuserAdminQuery,
  GetSuperuserAdminResponse,
  ListSuperusersAdminBody,
  ListSuperusersAdminQuery,
  ListSuperusersAdminResponse,
  ResetSuperuserPasswordAdminBody,
  ResetSuperuserPasswordAdminQuery,
  ResetSuperuserPasswordAdminResponse,
  UpdateSuperuserAdminBody,
  UpdateSuperuserAdminQuery,
  UpdateSuperuserAdminResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createSuperuserAdmin = async (
  superuser: CreateSuperuserAdminBody,
) => {
  return apiCall<
    CreateSuperuserAdminBody,
    CreateSuperuserAdminQuery,
    CreateSuperuserAdminResponse
  >({
    url: '/admin/superuser',
    method: HTTP_METHOD.POST,
    data: superuser,
  });
};

export const deleteSuperuserAdmin = async (superuserId: string) => {
  return apiCall<
    DeleteSuperuserAdminBody,
    DeleteSuperuserAdminQuery,
    DeleteSuperuserAdminResponse
  >({
    url: `/admin/superuser/${superuserId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const getSuperuserAdmin = async (superuserId?: string) => {
  if (superuserId) {
    return apiCall<
      GetSuperuserAdminBody,
      GetSuperuserAdminQuery,
      GetSuperuserAdminResponse
    >({
      method: HTTP_METHOD.GET,
      url: `/admin/superuser/${superuserId}`,
    });
  }
};

export const listSuperusersAdmin = async (params: ListSuperusersAdminQuery) => {
  return apiCall<
    ListSuperusersAdminBody,
    ListSuperusersAdminQuery,
    ListSuperusersAdminResponse
  >({
    url: `/admin/superuser/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const resetSuperuserPasswordAdmin = async (superuserId: string) => {
  return apiCall<
    ResetSuperuserPasswordAdminBody,
    ResetSuperuserPasswordAdminQuery,
    ResetSuperuserPasswordAdminResponse
  >({
    url: `/admin/superuser/${superuserId}/password_reset`,
    method: HTTP_METHOD.GET,
  });
};

export const updateSuperuserAdmin = async ({
  superuserId,
  superuserUpdate,
}: {
  superuserId: string;
  superuserUpdate: UpdateSuperuserAdminBody;
}) => {
  return apiCall<
    UpdateSuperuserAdminBody,
    UpdateSuperuserAdminQuery,
    UpdateSuperuserAdminResponse
  >({
    url: `/admin/superuser/${superuserId}`,
    method: HTTP_METHOD.PUT,
    data: superuserUpdate,
  });
};
