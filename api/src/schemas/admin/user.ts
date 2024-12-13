import z from 'zod';
import { strShort, strShortOptional } from '../../schemas/_presets';
import { empty, page, uuid } from '../_presets';

export const createUserAdminSchema = {
  body: z
    .object({
      email: strShort.email(),
      name: strShort,
    })
    .strict(),
  params: empty,
  query: empty,
};

export const listUsersAdminSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      page: page,
      search: strShortOptional,
      searchKey: z.enum(['email', 'name']),
    })
    .strict(),
};

export const getUserAdminSchema = { body: empty, params: z.object({ userId: uuid }).strict(), query: empty };

export const updateUserAdminSchema = {
  body: z
    .object({
      email: strShort.email().optional(),
      name: strShort.optional(),
    })
    .strict(),
  params: z
    .object({
      userId: uuid,
    })
    .strict(),
  query: empty,
};

export const deleteUserAdminSchema = {
  body: empty,
  params: z.object({
    userId: uuid,
  }),
  query: empty,
};

export const resetUserPasswordAdminSchema = {
  body: empty,
  params: z.object({
    userId: uuid,
  }),
  query: empty,
};
