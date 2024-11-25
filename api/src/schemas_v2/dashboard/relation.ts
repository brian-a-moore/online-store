import z from 'zod';
import { empty, role, uuid } from '../_presets';

export const addStoreRelationDashboardSchema = {
  body: z
    .object({
      storeId: uuid,
      roleId: role,
    })
    .strict(),
  params: empty,
  query: empty,
};

export const updateStoreRelationDashboardSchema = {
  body: z
    .object({
      roleId: role,
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
