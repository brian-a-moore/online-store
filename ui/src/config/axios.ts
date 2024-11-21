import axios, { AxiosResponse } from 'axios';
import { AUTH_TOKEN } from '../constants';
import { Params } from '../types';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/',
  timeout: 10000,
});

export const apiCall = async <D = undefined, P = undefined, R = undefined>(
  params: Params<D, P>,
  ctrl?: AbortController,
  isPrivateEndpoint = true,
): Promise<R> => {
  const secureAxios = async (contoller: AbortController, args: Params<D, P>) => {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    if (!authToken && isPrivateEndpoint) throw new Error('Authentication required but no auth token found');

    const headers: any = {};

    if (isPrivateEndpoint) headers['Authorization'] = `Bearer ${authToken}`;

    const res = await instance<any, AxiosResponse<R>>({
      ...args,
      signal: contoller.signal,
      headers,
    });
    return res.data;
  };

  try {
    const controller = ctrl || new AbortController();
    const data = await secureAxios(controller, params);
    return data;
  } catch (e: any | unknown) {
    if (axios.isCancel(e)) {
      console.warn('Request aborted');
    } else if (!e.response) {
      console.error('Network error');
    } else {
      throw e;
    }
    throw e;
  }
};

export default instance;
