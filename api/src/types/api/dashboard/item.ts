import { z } from 'zod';
import * as itemSchema from '../../../schemas/dashboard/item';

type JsonValue = string | any;

export type CreateItemDashboardBody = z.infer<typeof itemSchema.createItemDashboardSchema.body>;
export type CreateItemDashboardParams = z.infer<typeof itemSchema.createItemDashboardSchema.params>;
export type CreateItemDashboardQuery = z.infer<typeof itemSchema.createItemDashboardSchema.query>;
export type CreateItemDashboardResponse = { id: string };

export type ListItemsDashboardBody = z.infer<typeof itemSchema.listItemsDashboardSchema.body>;
export type ListItemsDashboardParams = z.infer<typeof itemSchema.listItemsDashboardSchema.params>;
export type ListItemsDashboardQuery = z.infer<typeof itemSchema.listItemsDashboardSchema.query>;
export type ListItemsDashboardResponse = {
  items: {
    name: string;
    id: string;
    isPublished: boolean;
    updatedAt: Date;
  }[];
};

export type GetItemDashboardBody = z.infer<typeof itemSchema.getItemDashboardSchema.body>;
export type GetItemDashboardParams = z.infer<typeof itemSchema.getItemDashboardSchema.params>;
export type GetItemDashboardQuery = z.infer<typeof itemSchema.getItemDashboardSchema.query>;
export type GetItemDashboardResponse = {
  item: {
    itemTypeId: number;
    name: string;
    description: string | null;
    config: JsonValue;
    maxQuantityPerOrder: number;
    productId: string;
    id: string;
    image: string | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UpdateItemDashboardBody = z.infer<typeof itemSchema.updateItemDashboardSchema.body>;
export type UpdateItemDashboardParams = z.infer<typeof itemSchema.updateItemDashboardSchema.params>;
export type UpdateItemDashboardQuery = z.infer<typeof itemSchema.updateItemDashboardSchema.query>;
export type UpdateItemDashboardResponse = never;

export type DeleteItemDashboardBody = z.infer<typeof itemSchema.deleteItemDashboardSchema.body>;
export type DeleteItemDashboardParams = z.infer<typeof itemSchema.deleteItemDashboardSchema.params>;
export type DeleteItemDashboardQuery = z.infer<typeof itemSchema.deleteItemDashboardSchema.query>;
export type DeleteItemDashboardResponse = never;
