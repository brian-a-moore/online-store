import z from 'zod';
import { empty, page, uuid } from '../_presets';

export const createSuperuserAdminSchema = { body: empty, params: empty, query: empty };

export const listSuperusersAdminSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      page: page,
    })
    .strict(),
};

export const getSuperuserAdminSchema = { body: empty, params: empty, query: empty };

export const updateSuperuserAdminSchema = {
  body: empty,
  params: z
    .object({
      superuserId: uuid,
    })
    .strict(),
  query: empty,
};

export const deleteSuperuserAdminSchema = {
  body: empty,
  params: z.object({
    superuserId: uuid,
  }),
  query: empty,
};
