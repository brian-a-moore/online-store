import {
  LoginAuthBody,
  LoginAuthQuery,
  LoginAuthResponse,
  VerifyTokenAuthBody,
  VerifyTokenAuthQuery,
  VerifyTokenAuthResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants'; // dpr

export const authLogin = async (
  loginCredentials: LoginAuthBody,
  domain: 'admin' | 'user',
) => {
  return apiCall<LoginAuthBody, LoginAuthQuery, LoginAuthResponse>(
    {
      url: `/auth/login`,
      method: HTTP_METHOD.POST,
      data: loginCredentials,
      params: { domain },
    },
    undefined,
    false,
  );
};

export const authVerifyToken = async (token: string) => {
  return apiCall<
    VerifyTokenAuthBody,
    VerifyTokenAuthQuery,
    VerifyTokenAuthResponse
  >(
    {
      url: `/auth/verify_token`,
      method: HTTP_METHOD.POST,
      data: { token },
    },
    undefined,
    false,
  );
};
