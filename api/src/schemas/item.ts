import { z } from 'zod';
import { bool, empty, itemType, obj, price, qty, strLong, strShort, uuid } from './_presets';

export const createItemSchema = {
  body: obj({
    productId: uuid,
    itemType: itemType,
    name: strShort,
    description: strLong.optional(),
    price: price,
    maxQuantityPerOrder: qty,
  }),
  params: obj({
    storeId: uuid,
    productId: uuid,
  }),
  query: empty,
};

export const deleteItemSchema = {
  body: empty,
  params: obj({
    storeId: uuid,
    productId: uuid,
    itemId: uuid,
  }),
  query: empty,
};

export const getItemPublicSchema = {
  body: empty,
  params: obj({
    storeId: uuid,
    productId: uuid,
    itemId: uuid,
  }),
  query: empty,
};

export const getItemPrivateSchema = {
  body: empty,
  params: obj({
    storeId: uuid,
    productId: uuid,
    itemId: uuid,
  }),
  query: empty,
};

export const listItemsPublicSchema = {
  body: empty,
  params: obj({
    storeId: uuid,
    productId: uuid,
  }),
  query: empty,
};

export const listItemsPrivateSchema = {
  body: empty,
  params: obj({
    storeId: uuid,
    productId: uuid,
  }),
  query: obj({
    itemTypes: z.array(itemType).min(1).max(3),
    isAvailable: bool.optional(),
  }),
};

export const updateItemSchema = {
  body: obj({
    name: strShort.optional(),
    description: strLong.optional(),
    price: price.optional(),
    maxQuantityPerOrder: qty.optional(),
  }),
  params: obj({
    storeId: uuid,
    productId: uuid,
    itemId: uuid,
  }),
  query: empty,
};
