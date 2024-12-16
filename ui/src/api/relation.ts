import {
  AddStoreRelationDashboardBody,
  AddStoreRelationDashboardQuery,
  AddStoreRelationDashboardResponse,
  DeleteStoreRelationDashboardBody,
  DeleteStoreRelationDashboardQuery,
  DeleteStoreRelationDashboardResponse,
  UpdateStoreRelationDashboardBody,
  UpdateStoreRelationDashboardQuery,
  UpdateStoreRelationDashboardResponse,
} from '../../../api/src/types/api';
import { apiCall } from '../config/axios';
import { HTTP_METHOD } from '../constants';

export const addStoreRelation = async (
  relation: AddStoreRelationDashboardBody,
) => {
  return apiCall<
    AddStoreRelationDashboardBody,
    AddStoreRelationDashboardQuery,
    AddStoreRelationDashboardResponse
  >({
    url: `/dashboard/relation`,
    method: HTTP_METHOD.POST,
    data: relation,
  });
};

export const deleteStoreRelation = async (relationId: string) => {
  return apiCall<
    DeleteStoreRelationDashboardBody,
    DeleteStoreRelationDashboardQuery,
    DeleteStoreRelationDashboardResponse
  >({
    url: `/dashboard/relation/${relationId}`,
    method: HTTP_METHOD.DELETE,
  });
};

export const updateStoreRelation = async (
  relationId: string,
  roleId: number,
) => {
  return apiCall<
    UpdateStoreRelationDashboardBody,
    UpdateStoreRelationDashboardQuery,
    UpdateStoreRelationDashboardResponse
  >({
    url: `/dashboard/relation/${relationId}`,
    method: HTTP_METHOD.PUT,
    data: { roleId },
  });
};
