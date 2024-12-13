import z from 'zod';
import { strLongOptional, strShort, strShortOptional } from '../../schemas/_presets';
import { empty, page, uuid } from '../_presets';

export const createStoreAdminSchema = {
  body: z
    .object({
      name: strShort,
      description: strLongOptional,
      isPublished: z.boolean(),
    })
    .strict(),
  params: empty,
  query: empty,
};

export const listStoresAdminSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      page: page,
      search: strShortOptional,
      statusFilter: z.enum(['public', 'unlisted', 'all']),
    })
    .strict(),
};

export const getStoreAdminSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: empty,
};

export const updateStoreAdminSchema = {
  body: z
    .object({
      name: strShort,
      description: strLongOptional,
      isPublished: z.boolean().optional(),
    })
    .strict(),
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: empty,
};

export const deleteStoreAdminSchema = {
  body: empty,
  params: z.object({
    storeId: uuid,
  }),
  query: empty,
};
