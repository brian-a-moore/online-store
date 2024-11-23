import { z } from 'zod';
import { bool, empty, role, strShort, uuid } from './_presets';

export const createUserSchema = {
  body: z
    .object({
      email: strShort.email(),
      name: strShort,
      isSuperUser: bool,
      stores: z
        .array(
          z.object({
            storeId: uuid,
            roleId: role,
          }),
        )
        .min(0)
        .max(10),
    })
    .strict(),
  params: empty,
  query: empty,
};

export const deleteUserSchema = {
  body: empty,
  params: z
    .object({
      userId: uuid,
    })
    .strict(),
  query: empty,
};

export const getUserSchema = {
  body: empty,
  params: z
    .object({
      userId: uuid,
    })
    .strict(),
  query: empty,
};

export const listUsersSchema = {
  body: empty,
  params: empty,
  query: z.object({
    page: z.string().min(1).max(6),
    storeId: z.string().min(36).max(36).optional(), // if left out, all stores users are returned
    roleId: z.string().min(1).max(1).optional(), // if left out, users of all roles are returned
  }),
};

export const searchUsersSchema = {
  body: empty,
  params: empty,
  query: z.object({
    search: strShort,
    field: z.enum(['email', 'name']),
  }),
};

export const updateUserSchema = {
  body: z
    .object({
      email: strShort.email().optional(),
      name: strShort.optional(),
      isSuperUser: bool.optional(),
    })
    .strict(),
  params: z.object({
    userId: uuid,
  }),
  query: empty,
};
