import {
  UpdateStoreDashboardBody,
  UpdateStoreDashboardQuery,
  UpdateStoreDashboardResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const updateStore = async (
  storeId: string,
  storeUpdate: UpdateStoreDashboardBody,
) => {
  return apiCall<
    UpdateStoreDashboardBody,
    UpdateStoreDashboardQuery,
    UpdateStoreDashboardResponse
  >({
    url: `/dashboard/store/${storeId}`,
    method: HTTP_METHOD.PUT,
    data: storeUpdate,
  });
};
