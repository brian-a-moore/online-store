import { z } from 'zod';

export const createUserSchema = {
  body: z.object({
    email: z.string().min(1).max(256).email(),
    name: z.string().min(1).max(256),
    roleId: z.number().int().min(1).max(3),
    storeId: z.string().uuid().optional(),
  }),
  params: z.object({}),
  query: z.object({}),
};

export const deleteUserSchema = {
  body: z.object({}),
  params: z.object({
    userId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const getUserSchema = {
  body: z.object({}),
  params: z.object({
    userId: z.string().uuid(),
  }),
  query: z.object({}),
};

export const listUsersSchema = {
  body: z.object({}),
  params: z.object({}),
  query: z.object({
    storeId: z.string().uuid().optional(),
    roles: z.array(z.number().int().min(1).max(3)).min(1).max(3).optional(),
  }),
};

export const updateUserSchema = {
  body: z.object({
    email: z.string().min(1).max(256).email().optional(),
    name: z.string().min(1).max(256).optional(),
    roleId: z.number().int().min(1).max(3).optional(),
  }),
  params: z.object({
    userId: z.string().uuid(),
  }),
  query: z.object({}),
};
