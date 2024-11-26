import z from 'zod';
import { empty, page, strLong, strShort, uuid } from '../_presets';

export const createProductDashboardSchema = {
  body: z
    .object({
      name: strShort,
      description: strLong.optional(),
      isPublished: z.boolean(),
    })
    .strict(),
  params: empty,
  query: z.object({ storeId: uuid }).strict(),
};

export const listProductsDashboardSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      storeId: uuid,
      page: page,
    })
    .strict(),
};

export const getProductDashboardSchema = {
  body: empty,
  params: z
    .object({
      productId: uuid,
    })
    .strict(),
  query: empty,
};

export const updateProductDashboardSchema = {
  body: z
    .object({
      name: strShort,
      description: strLong.optional(),
      isPublished: z.boolean(),
    })
    .strict(),
  params: z
    .object({
      productId: uuid,
    })
    .strict(),
  query: empty,
};

export const deleteProductDashboardSchema = {
  body: empty,
  params: z
    .object({
      productId: uuid,
    })
    .strict(),
  query: empty,
};
