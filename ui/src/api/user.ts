import {
  CreateUserAdminBody,
  CreateUserAdminQuery,
  CreateUserAdminResponse,
  DeleteUserAdminBody,
  DeleteUserAdminQuery,
  DeleteUserAdminResponse,
  GetUserAdminBody,
  GetUserAdminQuery,
  GetUserAdminResponse,
  ListUsersAdminBody,
  ListUsersAdminQuery,
  ListUsersAdminResponse,
  ResetUserPasswordAdminBody,
  ResetUserPasswordAdminQuery,
  ResetUserPasswordAdminResponse,
  SearchUsersDashboardBody,
  SearchUsersDashboardQuery,
  SearchUsersDashboardResponse,
  UpdateSuperuserAdminBody,
  UpdateUserAdminBody,
  UpdateUserAdminQuery,
  UpdateUserAdminResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createUserAdmin = async (user: CreateUserAdminBody) => {
  return apiCall<
    CreateUserAdminBody,
    CreateUserAdminQuery,
    CreateUserAdminResponse
  >({
    url: '/admin/user',
    method: HTTP_METHOD.POST,
    data: user,
  });
};

export const deleteUserAdmin = async (userId: string) => {
  return apiCall<
    DeleteUserAdminBody,
    DeleteUserAdminQuery,
    DeleteUserAdminResponse
  >({
    url: `/admin/user/${userId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const getUserAdmin = async (userId?: string) => {
  if (userId) {
    return apiCall<GetUserAdminBody, GetUserAdminQuery, GetUserAdminResponse>({
      method: HTTP_METHOD.GET,
      url: `/admin/User/${userId}`,
    });
  }
};

export const listUsersAdmin = async (params: ListUsersAdminQuery) => {
  return apiCall<
    ListUsersAdminBody,
    ListUsersAdminQuery,
    ListUsersAdminResponse
  >({
    url: `/admin/user/list`,
    method: HTTP_METHOD.GET,
    params,
  });
};

export const resetUserPasswordAdmin = async (userId: string) => {
  return apiCall<
    ResetUserPasswordAdminBody,
    ResetUserPasswordAdminQuery,
    ResetUserPasswordAdminResponse
  >({
    url: `/admin/user/${userId}/password_reset`,
    method: HTTP_METHOD.GET,
  });
};

export const updateUserAdmin = async ({
  userId,
  userUpdate,
}: {
  userId: string;
  userUpdate: UpdateUserAdminBody;
}) => {
  return apiCall<
    UpdateSuperuserAdminBody,
    UpdateUserAdminQuery,
    UpdateUserAdminResponse
  >({
    url: `/admin/user/${userId}`,
    method: HTTP_METHOD.PUT,
    data: userUpdate,
  });
};

export const userSearchDashboard = async (
  field: 'email' | 'name',
  debouncedSearch: string,
) => {
  if (debouncedSearch.length > 2) {
    return apiCall<
      SearchUsersDashboardBody,
      SearchUsersDashboardQuery,
      SearchUsersDashboardResponse
    >({
      url: `/dashboard/user/search`,
      method: HTTP_METHOD.GET,
      params: { search: debouncedSearch, field, page: '1' },
    });
  }
};
