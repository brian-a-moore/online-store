import { z } from 'zod';

export const createStoreSchema = {
  body: z.object({
    name: z.string().min(1).max(256),
    description: z.string().min(1).max(2048).optional(),
    website: z.string().min(1).max(256).optional(),
  }),
  params: z.object({}),
  query: z.object({}),
};

export const deleteStoreSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const getStorePublicSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const getStorePrivateSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const listStoresPublicSchema = {
  body: z.object({}),
  params: z.object({}),
  query: z.object({}),
};

export const listStoresPrivateSchema = {
  body: z.object({}),
  params: z.object({}),
  query: z.object({}),
};

export const updateStoreSchema = {
  body: z.object({
    name: z.string().min(1).max(256).optional(),
    description: z.string().min(1).max(2048).optional(),
    website: z.string().min(1).max(256).optional(),
  }),
  params: z.object({
    storeId: z.string().uuid(),
  }),
  query: z.object({}),
};
