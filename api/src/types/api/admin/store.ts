import { z } from 'zod';
import * as adminStoreSchemas from '../../../schemas/admin/store';

export type CreateStoreAdminBody = z.infer<typeof adminStoreSchemas.createStoreAdminSchema.body>;
export type CreateStoreAdminParams = z.infer<typeof adminStoreSchemas.createStoreAdminSchema.params>;
export type CreateStoreAdminQuery = z.infer<typeof adminStoreSchemas.createStoreAdminSchema.query>;
export type CreateStoreAdminResponse = { id: string };

export type ListStoresAdminBody = z.infer<typeof adminStoreSchemas.listStoresAdminSchema.body>;
export type ListStoresAdminParams = z.infer<typeof adminStoreSchemas.listStoresAdminSchema.params>;
export type ListStoresAdminQuery = z.infer<typeof adminStoreSchemas.listStoresAdminSchema.query>;
export type ListStoresAdminResponse = {
  stores: {
    name: string;
    id: string;
    isPublished: boolean;
    updatedAt: Date;
  }[];
};

export type GetStoreAdminBody = z.infer<typeof adminStoreSchemas.getStoreAdminSchema.body>;
export type GetStoreAdminParams = z.infer<typeof adminStoreSchemas.getStoreAdminSchema.params>;
export type GetStoreAdminQuery = z.infer<typeof adminStoreSchemas.getStoreAdminSchema.query>;
export type GetStoreAdminResponse = {
  store: {
    name: string;
    website: string | null;
    id: string;
    image: string | null;
    bannerImage: string | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UpdateStoreAdminBody = z.infer<typeof adminStoreSchemas.updateStoreAdminSchema.body>;
export type UpdateStoreAdminParams = z.infer<typeof adminStoreSchemas.updateStoreAdminSchema.params>;
export type UpdateStoreAdminQuery = z.infer<typeof adminStoreSchemas.updateStoreAdminSchema.query>;
export type UpdateStoreAdminResponse = never;

export type DeleteStoreAdminBody = z.infer<typeof adminStoreSchemas.deleteStoreAdminSchema.body>;
export type DeleteStoreAdminParams = z.infer<typeof adminStoreSchemas.deleteStoreAdminSchema.params>;
export type DeleteStoreAdminQuery = z.infer<typeof adminStoreSchemas.deleteStoreAdminSchema.query>;
export type DeleteStoreAdminResponse = never;
