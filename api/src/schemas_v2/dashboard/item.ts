import z from 'zod';
import { empty, page, uuid } from '../_presets';

export const createItemDashboardSchema = { body: empty, params: empty, query: empty };

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

export const getItemDashboardSchema = { body: empty, params: empty, query: empty };

export const updateItemDashboardSchema = {
  body: empty,
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
