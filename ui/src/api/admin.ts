import {
  CreateSuperuserAdminBody,
  CreateSuperuserAdminQuery,
  CreateSuperuserAdminResponse,
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
