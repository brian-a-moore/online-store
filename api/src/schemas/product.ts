import { z } from 'zod';

export const createProductSchema = {
  body: z.object({
    name: z.string().min(1).max(256),
    description: z.string().min(1).max(2048).optional(),
  }),
  params: z.object({}),
  query: z.object({}),
};

export const deleteProductSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const getProductPublicSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const getProductPrivateSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const listProductsPublicSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const listProductsPrivateSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
  }),
  query: z.object({
    isAvailable: z.boolean().optional(),
  }),
};

export const updateProductSchema = {
  body: z.object({
    name: z.string().min(1).max(256).optional(),
    description: z.string().min(1).max(2048).optional(),
  }),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
  }),
  query: z.object({}),
};
