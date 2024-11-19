import { z } from 'zod';
import { bool, empty, obj, role, strShort, uuid } from './_presets';

export const createUserSchema = {
  body: obj({
    email: strShort.email(),
    name: strShort,
    isSuperUser: bool,
    stores: z
      .array(
        obj({
          storeId: uuid,
          roleId: role,
        }),
      )
      .min(0)
      .max(10),
  }),
  params: empty,
  query: empty,
};

export const deleteUserSchema = {
  body: empty,
  params: obj({
    userId: uuid,
  }),
  query: empty,
};

export const getUserSchema = {
  body: empty,
  params: obj({
    userId: uuid,
  }),
  query: empty,
};

export const listUsersSchema = {
  body: empty,
  params: empty,
  query: obj({
    storeId: uuid.optional(),
    roles: z.array(role).min(1).max(3).optional(),
  }),
};

export const updateUserSchema = {
  body: obj({
    email: strShort.email().optional(),
    name: strShort.optional(),
    roleId: role.optional(),
  }),
  params: obj({
    userId: uuid,
  }),
  query: empty,
};
