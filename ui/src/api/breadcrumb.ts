import {
  GetBreadcrumbDashboardBody,
  GetBreadcrumbDashboardQuery,
  GetBreadcrumbDashboardResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const getBreadcrumDashboard = async (
  params: GetBreadcrumbDashboardQuery,
) => {
  return apiCall<
    GetBreadcrumbDashboardBody,
    GetBreadcrumbDashboardQuery,
    GetBreadcrumbDashboardResponse
  >({
    url: '/dashboard/breadcrumb',
    method: HTTP_METHOD.GET,
    params,
  });
};
