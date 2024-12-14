import z from 'zod';
import {
  empty,
  page,
  strLongOptional,
  strShortOptional,
  uuid,
} from '../_presets';

export const listItemsAdminSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      page: page,
      search: strShortOptional,
      searchKey: z.enum(['name', 'product.name']),
      statusFilter: z.enum(['public', 'unlisted', 'all']),
    })
    .strict(),
};

export const getItemAdminSchema = {
  body: empty,
  params: z.object({ itemId: uuid }).strict(),
  query: empty,
};

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
