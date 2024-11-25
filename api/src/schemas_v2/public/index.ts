import z from 'zod';
import { empty, page, uuid } from '../_presets';

export const listStoresPublicSchema = {
  body: empty,
  params: z
    .object({
      page: page,
    })
    .strict(),
  query: empty,
};

export const getStorePublicSchema = { body: empty, params: empty, query: empty };

export const listProductsPublicSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
      page: page,
    })
    .strict(),
  query: empty,
};

export const getProductPublicSchema = { body: empty, params: empty, query: empty };

export const listItemsPublicSchema = {
  body: empty,
  params: z
    .object({
      productId: uuid,
      page: page,
    })
    .strict(),
  query: empty,
};
