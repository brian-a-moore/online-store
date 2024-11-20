import { z } from 'zod';
import { bool, empty, itemType, price, qty, strLong, strShort, uuid } from './_presets';

export const createItemSchema = {
  body: z
    .object({
      productId: uuid,
      itemType: itemType,
      name: strShort,
      description: strLong.optional(),
      price: price,
      maxQuantityPerOrder: qty,
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

export const deleteItemSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
      itemId: uuid,
    })
    .strict(),
  query: empty,
};

export const getItemPublicSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
      itemId: uuid,
    })
    .strict(),
  query: empty,
};

export const getItemPrivateSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
      itemId: uuid,
    })
    .strict(),
  query: empty,
};

export const listItemsPublicSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
    })
    .strict(),
  query: empty,
};

export const listItemsPrivateSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
    })
    .strict(),
  query: z
    .object({
      itemTypes: z.array(itemType).min(1).max(3),
      isAvailable: bool.optional(),
    })
    .strict(),
};

export const updateItemSchema = {
  body: z
    .object({
      name: strShort.optional(),
      description: strLong.optional(),
      price: price.optional(),
      maxQuantityPerOrder: qty.optional(),
    })
    .strict(),
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
      itemId: uuid,
    })
    .strict(),
  query: empty,
};
