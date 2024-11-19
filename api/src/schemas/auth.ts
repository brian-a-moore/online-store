import { z } from 'zod';

export const authLoginSchema = {
  body: z.object({
    email: z.string().min(1).max(256).email(),
    password: z.string().min(1).max(256),
  }),
  params: z.object({}),
  query: z.object({}),
};

export const authVerifyTokenSchema = {
  body: z.object({
    token: z.string(),
  }),
  params: z.object({}),
  query: z.object({}),
};
