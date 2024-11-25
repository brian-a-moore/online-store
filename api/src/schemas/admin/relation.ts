import z from 'zod';
import { empty, role, uuid } from '../_presets';

export const addStoreRelationAdminSchema = {
  body: z
    .object({
      storeId: uuid,
      roleId: role,
    })
    .strict(),
  params: empty,
  query: empty,
};

export const updateStoreRelationAdminSchema = {
  body: empty,
  params: z
    .object({
      relationId: uuid,
    })
    .strict(),
  query: empty,
};

export const deleteStoreRelationAdminSchema = {
  body: empty,
  params: z.object({
    relationId: uuid,
  }),
  query: empty,
};
