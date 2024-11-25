import { z } from 'zod';
import * as adminRelationSchemas from '../../../schemas_v2/admin/relation';

export type CreateStoreRelationBody = z.infer<typeof adminRelationSchemas.createStoreRelationAdminSchema.body>;
export type CreateStoreRelationParams = z.infer<typeof adminRelationSchemas.createStoreRelationAdminSchema.params>;
export type CreateStoreRelationQuery = z.infer<typeof adminRelationSchemas.createStoreRelationAdminSchema.query>;

export type UpdateStoreRelationBody = z.infer<typeof adminRelationSchemas.updateStoreRelationAdminSchema.body>;
export type UpdateStoreRelationParams = z.infer<typeof adminRelationSchemas.updateStoreRelationAdminSchema.params>;
export type UpdateStoreRelationQuery = z.infer<typeof adminRelationSchemas.updateStoreRelationAdminSchema.query>;

export type DeleteStoreRelationBody = z.infer<typeof adminRelationSchemas.deleteStoreRelationAdminSchema.body>;
export type DeleteStoreRelationParams = z.infer<typeof adminRelationSchemas.deleteStoreRelationAdminSchema.params>;
export type DeleteStoreRelationQuery = z.infer<typeof adminRelationSchemas.deleteStoreRelationAdminSchema.query>;
