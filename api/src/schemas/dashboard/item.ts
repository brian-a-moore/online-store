import z from 'zod';
import { empty, itemTypeId, page, price, qty, strLongOptional, strShort, strShortOptional, uuid } from '../_presets';

const fixedItemConfig = z
  .object({
    isRedeemable: z.boolean(),
    redeemByDate: z.string().optional(),
    price: price,
  })
  .strict();

const variableItemConfig = z
  .object({
    defaultAmount: price.or(z.literal(0)),
    minAmount: z.number().int().positive(),
    maxAmount: price,
    presetAmounts: z.array(price).min(0).max(5),
  })
  .strict();

export const createItemDashboardSchema = {
  body: z
    .object({
      itemTypeId: itemTypeId,
      name: strShort,
      description: strLongOptional,
      config: z.union([fixedItemConfig, variableItemConfig]),
      maxQuantityPerOrder: qty,
      isPublished: z.boolean(),
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
      search: strShortOptional,
      statusFilter: z.enum(['public', 'unlisted', 'all']),
    })
    .strict(),
};

export const getItemDashboardSchema = { body: empty, params: z.object({ itemId: uuid }).strict(), query: empty };

export const updateItemDashboardSchema = {
  body: z
    .object({
      name: strShortOptional,
      itemTypeId: itemTypeId.optional(),
      description: strLongOptional,
      config: z.union([fixedItemConfig, variableItemConfig]).optional(),
      maxQuantityPerOrder: qty.optional(),
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

export const deleteItemDashboardSchema = {
  body: empty,
  params: z
    .object({
      itemId: uuid,
    })
    .strict(),
  query: empty,
};
