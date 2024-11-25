import z from 'zod';
import { empty, page, uuid } from '../_presets';

export const listItemsAdminSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      productId: uuid.optional(),
      page: page,
    })
    .strict(),
};

export const getItemAdminSchema = { body: empty, params: z.object({ itemId: uuid }).strict(), query: empty };

export const updateItemAdminSchema = {
  body: empty,
  params: z
    .object({
      itemId: uuid,
    })
    .strict(),
  query: empty,
};

export const deleteItemAdminSchema = {
  body: empty,
  params: z.object({
    itemId: uuid,
  }),
  query: empty,
};
