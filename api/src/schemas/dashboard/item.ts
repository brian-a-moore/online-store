import z from 'zod';
import { empty, itemTypeId, page, price, qty, strLong, strShort, uuid } from '../_presets';

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

export const createItemDashboardSchema = {
  body: z
    .object({
      itemTypeId: itemTypeId,
      name: strShort,
      description: strLong.optional(),
      config: z.union([fixedItemConfig, variableItemConfig]),
      maxQuantityPerOrder: qty,
    })
    .strict(),
  params: empty,
  query: z
    .object({
      productId: uuid,
    })
    .strict(),
};

export const listItemsDashboardSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      productId: uuid,
      page: page,
    })
    .strict(),
};

export const getItemDashboardSchema = { body: empty, params: z.object({ itemId: uuid }).strict(), query: empty };

export const updateItemDashboardSchema = {
  body: z
    .object({
      name: strShort.optional(),
      itemTypeId: itemTypeId.optional(),
      description: strLong.optional(),
      config: z.union([fixedItemConfig, variableItemConfig]).optional(),
      maxQuantityPerOrder: qty.optional(),
    })
    .strict(),
  params: z
    .object({
      itemId: uuid,
    })
    .strict(),
  query: empty,
};

export const deleteItemDashboardSchema = {
  body: empty,
  params: z
    .object({
      itemId: uuid,
    })
    .strict(),
  query: empty,
};
