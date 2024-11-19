import { z } from 'zod';

export const createItemSchema = {
  body: z.object({
    productId: z.string().uuid(),
    itemType: z.enum(['donation', 'merchandise', 'ticket']),
    name: z.string().min(1).max(256),
    description: z.string().min(1).max(2048).optional(),
    price: z.number().positive().min(1).max(999999),
    maxQuantityPerOrder: z.number().int().positive().min(1).max(999),
  }),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const deleteItemSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
    itemId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const getItemPublicSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
    itemId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const getItemPrivateSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
    itemId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const listItemsPublicSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const listItemsPrivateSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
  }),
  query: z.object({
    itemTypes: z
      .array(z.enum(['donation', 'merchandise', 'ticket']))
      .min(1)
      .max(3),
    isAvailable: z.boolean().optional(),
  }),
};

export const updateItemSchema = {
  body: z.object({
    name: z.string().min(1).max(256).optional(),
    description: z.string().min(1).max(2048).optional(),
    price: z.number().positive().min(1).max(999999).optional(),
    maxQuantityPerOrder: z.number().int().positive().min(1).max(999).optional(),
  }),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
    itemId: z.string().uuid(),
  }),
  query: z.object({}),
};
