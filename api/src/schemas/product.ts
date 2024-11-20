import { z } from 'zod';
import { bool, empty, strLong, strShort, uuid } from './_presets';

export const createProductSchema = {
  body: z
    .object({
      name: strShort,
      description: strLong.optional(),
    })
    .strict(),
  params: empty,
  query: empty,
};

export const deleteProductSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
    })
    .strict(),
  query: empty,
};

export const getProductPublicSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
    })
    .strict(),
  query: empty,
};

export const getProductPrivateSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
    })
    .strict(),
  query: empty,
};

export const listProductsPublicSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: empty,
};

export const listProductsPrivateSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: z
    .object({
      isAvailable: bool.optional(),
    })
    .strict(),
};

export const updateProductSchema = {
  body: z
    .object({
      name: strShort.optional(),
      description: strLong.optional(),
    })
    .strict(),
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
    })
    .strict(),
  query: empty,
};
