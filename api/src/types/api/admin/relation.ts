import { z } from 'zod';
import * as adminRelationSchemas from '../../../schemas/admin/relation';

export type AddStoreRelationAdminBody = z.infer<
  typeof adminRelationSchemas.addStoreRelationAdminSchema.body
>;
export type AddStoreRelationAdminParams = z.infer<
  typeof adminRelationSchemas.addStoreRelationAdminSchema.params
>;
export type AddStoreRelationAdminQuery = z.infer<
  typeof adminRelationSchemas.addStoreRelationAdminSchema.query
>;
export type AddStoreRelationAdminResponse = { id: string };

export type UpdateStoreRelationAdminBody = z.infer<
  typeof adminRelationSchemas.updateStoreRelationAdminSchema.body
>;
export type UpdateStoreRelationAdminParams = z.infer<
  typeof adminRelationSchemas.updateStoreRelationAdminSchema.params
>;
export type UpdateStoreRelationAdminQuery = z.infer<
  typeof adminRelationSchemas.updateStoreRelationAdminSchema.query
>;
export type UpdateStoreRelationAdminResponse = never;

export type DeleteStoreRelationAdminBody = z.infer<
  typeof adminRelationSchemas.deleteStoreRelationAdminSchema.body
>;
export type DeleteStoreRelationAdminParams = z.infer<
  typeof adminRelationSchemas.deleteStoreRelationAdminSchema.params
>;
export type DeleteStoreRelationAdminQuery = z.infer<
  typeof adminRelationSchemas.deleteStoreRelationAdminSchema.query
>;
export type DeleteStoreRelationAdminResponse = never;
