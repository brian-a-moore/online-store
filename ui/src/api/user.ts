import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const createUser = async (newUser: any) => {
  return apiCall<any, any, any>({
    url: `/admin/user`,
    method: HTTP_METHOD.POST,
    data: newUser,
  });
};

export const deleteUser = async (userId: string) => {
  return apiCall<any, any, any>({
    url: `/admin/user/${userId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateUser = async (userId: string, userUpdate: any) => {
  return apiCall<any, any, any>({
    url: `/admin/user/${userId}`,
    method: HTTP_METHOD.PUT,
    data: userUpdate,
  });
};
