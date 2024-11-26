import z from 'zod';
import { empty, page, strLongOptional, strShortOptional, uuid } from '../_presets';

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
  body: z
    .object({
      name: strShortOptional,
      description: strLongOptional,
      isPublished: z.boolean().optional(),
    })
    .strict(),
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
