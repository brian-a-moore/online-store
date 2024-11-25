import z from 'zod';
import { empty, uuid } from '../_presets';

export const addStoreRelationDashboardSchema = {
  body: z
    .object({
      storeId: uuid,
      roleId: uuid,
    })
    .strict(),
  params: empty,
  query: empty,
};

export const updateStoreRelationDashboardSchema = {
  body: z
    .object({
      roleId: uuid,
    })
    .strict(),
  params: z
    .object({
      relationId: uuid,
    })
    .strict(),
  query: empty,
};

export const deleteStoreRelationDashboardSchema = {
  body: empty,
  params: z.object({ relationid: uuid }).strict(),
  query: empty,
};
