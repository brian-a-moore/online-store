import z from 'zod';
import { empty, page, uuid } from '../_presets';

export const createProductDashboardSchema = { body: empty, params: empty, query: empty };

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
  body: empty,
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
