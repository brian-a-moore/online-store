import { z } from 'zod';
import { empty, itemTypeId, price, qty, strLong, strShort, uuid } from './_presets';

const fixedItemConfig = z
  .object({
    isRedeemable: z.boolean(),
    redeemedAt: z.string().optional(),
    redeemByDate: z.string().optional(),
    price: price,
  })
  .strict();

const variableItemConfig = z
  .object({
    defaultAmount: price.or(z.literal(0)),
    minAmount: z.number().int().positive(),
    maxAmount: price,
    stepAmount: z.number().int().positive(),
    presetAmounts: z.array(price).min(0).max(5),
  })
  .strict();

export const createItemSchema = {
  body: z
    .object({
      itemTypeId: itemTypeId,
      name: strShort,
      description: strLong.optional(),
      config: z.union([fixedItemConfig, variableItemConfig]),
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

export const getItemSchema = {
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
  query: z.object({
    page: z.string().min(1).max(6),
  }),
};

export const listItemsPrivateSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
      productId: uuid,
    })
    .strict(),
  query: z.object({
    page: z.string().min(1).max(6),
  }),
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
