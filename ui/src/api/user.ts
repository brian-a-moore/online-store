import {
  CreateUserBody,
  CreateUserQuery,
  CreateUserResponse,
  DeleteUserBody,
  DeleteUserQuery,
  DeleteUserResponse,
  UpdateUserBody,
  UpdateUserQuery,
  UpdateUserResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createUser = async (newUser: CreateUserBody) => {
  return apiCall<CreateUserBody, CreateUserQuery, CreateUserResponse>({
    url: `/admin/user`,
    method: HTTP_METHOD.POST,
    data: newUser,
  });
};

export const deleteUser = async (userId: string) => {
  return apiCall<DeleteUserBody, DeleteUserQuery, DeleteUserResponse>({
    url: `/admin/user/${userId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateUser = async (userId: string, userUpdate: UpdateUserBody) => {
  return apiCall<UpdateUserBody, UpdateUserQuery, UpdateUserResponse>({
    url: `/admin/user/${userId}`,
    method: HTTP_METHOD.PUT,
    data: userUpdate,
  });
};
