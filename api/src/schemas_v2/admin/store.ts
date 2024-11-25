import z from 'zod';
import { strShort } from '../../schemas/_presets';
import { empty, page, strLong, uuid } from '../_presets';

export const createStoreAdminSchema = {
  body: z
    .object({
      name: strShort,
      description: strLong.optional(),
      website: strShort.optional(),
    })
    .strict(),
  params: empty,
  query: empty,
};

export const listStoresAdminSchema = {
  body: empty,
  params: z
    .object({
      page: page,
    })
    .strict(),
  query: empty,
};

export const getStoreAdminSchema = { body: empty, params: empty, query: empty };

export const updateStoreAdminSchema = {
  body: z
    .object({
      name: strShort.optional(),
      description: strLong.optional(),
      website: strShort.optional(),
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
