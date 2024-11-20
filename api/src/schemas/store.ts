import { z } from 'zod';
import { bool, empty, strLong, strShort } from './_presets';

export const createStoreSchema = {
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

export const deleteStoreSchema = {
  body: empty,
  params: z
    .object({
      storeId: bool,
    })
    .strict(),
  query: empty,
};

export const getStorePublicSchema = {
  body: empty,
  params: z
    .object({
      storeId: bool,
    })
    .strict(),
  query: empty,
};

export const getStorePrivateSchema = {
  body: empty,
  params: z
    .object({
      storeId: bool,
    })
    .strict(),
  query: empty,
};

export const listStoresPublicSchema = {
  body: empty,
  params: empty,
  query: empty,
};

export const listStoresPrivateSchema = {
  body: empty,
  params: empty,
  query: empty,
};

export const updateStoreSchema = {
  body: z
    .object({
      name: strShort.optional(),
      description: strLong.optional(),
      website: strShort.optional(),
    })
    .strict(),
  params: z
    .object({
      storeId: bool,
    })
    .strict(),
  query: empty,
};
