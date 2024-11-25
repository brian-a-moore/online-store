import z from 'zod';
import { strShort } from '../../schemas/_presets';
import { empty, page, uuid } from '../_presets';

export const createSuperuserAdminSchema = {
  body: z
    .object({
      email: strShort.email(),
      name: strShort,
    })
    .strict(),
  params: empty,
  query: empty,
};

export const listSuperusersAdminSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      page: page,
    })
    .strict(),
};

export const getSuperuserAdminSchema = {
  body: empty,
  params: z.object({ superuserId: uuid }).strict(),
  query: empty,
};

export const updateSuperuserAdminSchema = {
  body: z
    .object({
      email: strShort.email().optional(),
      name: strShort.optional(),
    })
    .strict(),
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
