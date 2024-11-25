import { z } from 'zod';
import * as adminStoreSchemas from '../../../schemas_v2/admin/store';

export type CreateStoreAdminBody = z.infer<typeof adminStoreSchemas.createStoreAdminSchema.body>;
export type CreateStoreAdminParams = z.infer<typeof adminStoreSchemas.createStoreAdminSchema.params>;
export type CreateStoreAdminQuery = z.infer<typeof adminStoreSchemas.createStoreAdminSchema.query>;

export type ListStoresAdminBody = z.infer<typeof adminStoreSchemas.listStoresAdminSchema.body>;
export type ListStoresAdminParams = z.infer<typeof adminStoreSchemas.listStoresAdminSchema.params>;
export type ListStoresAdminQuery = z.infer<typeof adminStoreSchemas.listStoresAdminSchema.query>;

export type GetStoreAdminBody = z.infer<typeof adminStoreSchemas.getStoreAdminSchema.body>;
export type GetStoreAdminParams = z.infer<typeof adminStoreSchemas.getStoreAdminSchema.params>;
export type GetStoreAdminQuery = z.infer<typeof adminStoreSchemas.getStoreAdminSchema.query>;

export type UpdateStoreAdminBody = z.infer<typeof adminStoreSchemas.updateStoreAdminSchema.body>;
export type UpdateStoreAdminParams = z.infer<typeof adminStoreSchemas.updateStoreAdminSchema.params>;
export type UpdateStoreAdminQuery = z.infer<typeof adminStoreSchemas.updateStoreAdminSchema.query>;

export type DeleteStoreAdminBody = z.infer<typeof adminStoreSchemas.deleteStoreAdminSchema.body>;
export type DeleteStoreAdminParams = z.infer<typeof adminStoreSchemas.deleteStoreAdminSchema.params>;
export type DeleteStoreAdminQuery = z.infer<typeof adminStoreSchemas.deleteStoreAdminSchema.query>;
