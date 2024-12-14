import z from 'zod';
import {
  empty,
  page,
  strLongOptional,
  strShort,
  strShortOptional,
  uuid,
} from '../_presets';

export const createProductDashboardSchema = {
  body: z
    .object({
      name: strShort,
      description: strLongOptional,
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
      search: strShortOptional,
      statusFilter: z.enum(['public', 'unlisted', 'all']),
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
      description: strLongOptional,
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
