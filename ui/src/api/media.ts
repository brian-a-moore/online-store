import {
  DeleteImageMediaBody,
  DeleteImageMediaQuery,
  DeleteImageMediaResponse,
  GetImageMediaBody,
  GetImageMediaQuery,
  GetImageMediaResponse,
  UploadImageMediaQuery,
  UploadImageMediaResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const deleteImageMedia = async (filePath: string) => {
  return apiCall<
    DeleteImageMediaBody,
    DeleteImageMediaQuery,
    DeleteImageMediaResponse
  >({
    url: '/media',
    method: HTTP_METHOD.DELETE,
    params: { filePath },
  });
};

export const getImageMedia = async (params: GetImageMediaQuery) => {
  return apiCall<GetImageMediaBody, GetImageMediaQuery, GetImageMediaResponse>({
    method: HTTP_METHOD.GET,
    url: '/media',
    params,
  });
};

export const updateImageMedia = async (
  upload: { storeId?: string; productId?: string; itemId?: string },
  image: File,
) => {
  const formData = new FormData();
  formData.append('image', image);

  return apiCall<FormData, UploadImageMediaQuery, UploadImageMediaResponse>({
    url: '/media',
    method: HTTP_METHOD.POST,
    data: formData,
    params: upload,
  });
};
