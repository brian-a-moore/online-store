import z from 'zod';
import { strShort } from '../../schemas/_presets';
import { empty, page, strLong, uuid } from '../_presets';

export const listProductsAdminSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      storeId: uuid.optional(),
      page: page,
    })
    .strict(),
};

export const getProductAdminSchema = { body: empty, params: z.object({ productId: uuid }).strict(), query: empty };

export const updateProductAdminSchema = {
  body: z
    .object({
      name: strShort.optional(),
      description: strLong.optional(),
    })
    .strict(),
  params: z.object({
    productId: uuid,
  }),
  query: empty,
};

export const deleteProductAdminSchema = { body: empty, params: z.object({ productId: uuid }).strict(), query: empty };
