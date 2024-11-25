import z from 'zod';
import { empty, page, uuid } from '../_presets';

export const listStoresPublicSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      page: page,
    })
    .strict(),
};

export const getStorePublicSchema = {
  body: empty,
  params: z.object({
    storeId: uuid,
  }),
  query: empty,
};

export const listProductsPublicSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      storeId: uuid,
      page: page,
    })
    .strict(),
};

export const getProductPublicSchema = {
  body: empty,
  params: z
    .object({
      productId: uuid,
    })
    .strict(),
  query: empty,
};

export const listItemsPublicSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      productId: uuid,
      page: page,
    })
    .strict(),
};
