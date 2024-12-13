import z from 'zod';
import { strLongOptional, strShortOptional } from '../../schemas/_presets';
import { empty, page, uuid } from '../_presets';

export const listProductsAdminSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      page: page,
      search: strShortOptional,
      searchKey: z.enum(['name', 'store.name']),
      statusFilter: z.enum(['public', 'unlisted', 'all']),
    })
    .strict(),
};

export const getProductAdminSchema = { body: empty, params: z.object({ productId: uuid }).strict(), query: empty };

export const updateProductAdminSchema = {
  body: z
    .object({
      name: strShortOptional,
      description: strLongOptional,
      isPublished: z.boolean().optional(),
    })
    .strict(),
  params: z.object({
    productId: uuid,
  }),
  query: empty,
};

export const deleteProductAdminSchema = { body: empty, params: z.object({ productId: uuid }).strict(), query: empty };
