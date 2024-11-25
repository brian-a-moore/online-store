import { z } from 'zod';
import * as storeSchema from '../../../schemas/dashboard/store';

export type ListStoresDashboardBody = z.infer<typeof storeSchema.listStoresDashboardSchema.body>;
export type ListStoresDashboardParams = z.infer<typeof storeSchema.listStoresDashboardSchema.params>;
export type ListStoresDashboardQuery = z.infer<typeof storeSchema.listStoresDashboardSchema.query>;
export type ListStoresDashboardResponse = {
  stores: {
    id: string;
    name: string;
    isPublished: boolean;
    updatedAt: Date;
  }[];
};

export type GetStoreDashboardBody = z.infer<typeof storeSchema.getStoreDashboardSchema.body>;
export type GetStoreDashboardParams = z.infer<typeof storeSchema.getStoreDashboardSchema.params>;
export type GetStoreDashboardQuery = z.infer<typeof storeSchema.getStoreDashboardSchema.query>;
export type GetStoreDashboardResponse = {
  store: {
    id: string;
    name: string;
    website: string | null;
    image: string | null;
    bannerImage: string | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type GetStoreTeamDashboardBody = z.infer<typeof storeSchema.getStoreTeamDashboardSchema.body>;
export type GetStoreTeamDashboardParams = z.infer<typeof storeSchema.getStoreTeamDashboardSchema.params>;
export type GetStoreTeamDashboardQuery = z.infer<typeof storeSchema.getStoreTeamDashboardSchema.query>;
export type GetStoreTeamDashboardResponse = {
  team: {
    id: string;
    name: string;
    email: string;
    store: {
      storeId: string;
      roleId: number;
    };
  }[];
};

export type UpdateStoreDashboardBody = z.infer<typeof storeSchema.updateStoreDashboardSchema.body>;
export type UpdateStoreDashboardParams = z.infer<typeof storeSchema.updateStoreDashboardSchema.params>;
export type UpdateStoreDashboardQuery = z.infer<typeof storeSchema.updateStoreDashboardSchema.query>;
export type UpdateStoreDashboardResponse = never;
