import {
  AuthLoginBody,
  AuthLoginQuery,
  AuthLoginResponse,
  AuthVerifyTokenBody,
  AuthVerifyTokenQuery,
  AuthVerifyTokenResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants'; // dpr

export const authLogin = async (loginCredentials: any) => {
  return apiCall<AuthLoginBody, AuthLoginQuery, AuthLoginResponse>({
    url: `/auth/login`,
    method: HTTP_METHOD.POST,
    data: loginCredentials,
  });
};

export const authVerifyToken = async (token: string) => {
  return apiCall<AuthVerifyTokenBody, AuthVerifyTokenQuery, AuthVerifyTokenResponse>({
    url: `/auth/verify_token`,
    method: HTTP_METHOD.POST,
    data: { token },
  });
};
