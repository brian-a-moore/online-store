import { z } from 'zod';

export const createProductSchema = {
  body: z.object({}),
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
  params: z.object({}),
  query: z.object({}),
};

export const listProductsPrivateSchema = {
  body: z.object({}),
  params: z.object({}),
  query: z.object({}),
};

export const updateProductSchema = {
  body: z.object({}),
  params: z.object({
    storeId: z.string().uuid(),
    productId: z.string().uuid(),
  }),
  query: z.object({}),
};
