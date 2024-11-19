import { z } from 'zod';

export const createUserSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const deleteUserSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const getUserSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const listUsersSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const updateUserSchema = {
  body: z.object({}),
  params: z.object({}),
};
