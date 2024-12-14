import { z } from 'zod';
import * as adminItemSchemas from '../../../schemas/admin/item';

type JsonValue = string | any;

export type ListItemsAdminBody = z.infer<
  typeof adminItemSchemas.listItemsAdminSchema.body
>;
export type ListItemsAdminParams = z.infer<
  typeof adminItemSchemas.listItemsAdminSchema.params
>;
export type ListItemsAdminQuery = z.infer<
  typeof adminItemSchemas.listItemsAdminSchema.query
>;
export type ListItemsAdminResponse = {
  items: {
    id: string;
    productId: string;
    name: string;
    productName: string;
    isPublished: string;
    itemType: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type GetItemAdminBody = z.infer<
  typeof adminItemSchemas.getItemAdminSchema.body
>;
export type GetItemAdminParams = z.infer<
  typeof adminItemSchemas.getItemAdminSchema.params
>;
export type GetItemAdminQuery = z.infer<
  typeof adminItemSchemas.getItemAdminSchema.query
>;
export type GetItemAdminResponse = {
  item: {
    productId: string;
    id: string;
    itemTypeId: number;
    name: string;
    description: string | null;
    image: string | null;
    maxQuantityPerOrder: number;
    isPublished: boolean;
    config: JsonValue;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UpdateItemAdminBody = z.infer<
  typeof adminItemSchemas.updateItemAdminSchema.body
>;
export type UpdateItemAdminParams = z.infer<
  typeof adminItemSchemas.updateItemAdminSchema.params
>;
export type UpdateItemAdminQuery = z.infer<
  typeof adminItemSchemas.updateItemAdminSchema.query
>;
export type UpdateItemAdminResponse = never;

export type DeleteItemAdminBody = z.infer<
  typeof adminItemSchemas.deleteItemAdminSchema.body
>;
export type DeleteItemAdminParams = z.infer<
  typeof adminItemSchemas.deleteItemAdminSchema.params
>;
export type DeleteItemAdminQuery = z.infer<
  typeof adminItemSchemas.deleteItemAdminSchema.query
>;
export type DeleteItemAdminResponse = never;
