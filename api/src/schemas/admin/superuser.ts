import z from 'zod';
import { strShort, strShortOptional } from '../../schemas/_presets';
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

export const getSuperuserAdminSchema = {
  body: empty,
  params: z.object({ superuserId: uuid }).strict(),
  query: empty,
};

export const listSuperusersAdminSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      page: page,
      search: strShortOptional,
      searchKey: z.enum(['email', 'name']),
      searchFilter: z.enum(['all', 'public', 'unlisted']),
    })
    .strict(),
};

export const updateSuperuserAdminSchema = {
  body: z
    .object({
      email: strShort.email().optional(),
      name: strShort.optional(),
      password: strShort.optional(),
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

export const resetSuperuserPasswordAdminSchema = {
  body: empty,
  params: z.object({
    superuserId: uuid,
  }),
  query: empty,
};
