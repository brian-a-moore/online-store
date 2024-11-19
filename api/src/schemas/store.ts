import { z } from 'zod';

export const createStoreSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const deleteStoreSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const getStorePublicSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const getStorePrivateSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const listStoresPublicSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const listStoresPrivateSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const updateStoreSchema = {
  body: z.object({}),
  params: z.object({}),
};
