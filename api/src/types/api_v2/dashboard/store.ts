import { z } from 'zod';
import * as storeSchema from '../../../schemas_v2/dashboard/store';

export type ListStoresDashboardBody = z.infer<typeof storeSchema.listStoresDashboardSchema.body>;
export type ListStoresDashboardParams = z.infer<typeof storeSchema.listStoresDashboardSchema.params>;
export type ListStoresDashboardQuery = z.infer<typeof storeSchema.listStoresDashboardSchema.query>;

export type GetStoreDashboardBody = z.infer<typeof storeSchema.getStoreDashboardSchema.body>;
export type GetStoreDashboardParams = z.infer<typeof storeSchema.getStoreDashboardSchema.params>;
export type GetStoreDashboardQuery = z.infer<typeof storeSchema.getStoreDashboardSchema.query>;

export type UpdateStoreDashboardBody = z.infer<typeof storeSchema.updateStoreDashboardSchema.body>;
export type UpdateStoreDashboardParams = z.infer<typeof storeSchema.updateStoreDashboardSchema.params>;
export type UpdateStoreDashboardQuery = z.infer<typeof storeSchema.updateStoreDashboardSchema.query>;
