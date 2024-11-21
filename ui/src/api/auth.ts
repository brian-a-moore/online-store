import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const authLogin = async (loginCredentials: any) => {
  return apiCall<any, any, any>({
    url: `/auth/login`,
    method: HTTP_METHOD.POST,
    data: loginCredentials,
  });
};

export const authVerifyToken = async (token: string) => {
  return apiCall<any, any, any>({
    url: `/auth/verify_token`,
    method: HTTP_METHOD.POST,
    data: { token },
  });
};
