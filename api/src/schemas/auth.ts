import { z } from 'zod';

export const authLoginSchema = {
  body: z.object({}),
  params: z.object({}),
  query: z.object({}),
};

export const authVerifyTokenSchema = {
  body: z.object({}),
  params: z.object({}),
  query: z.object({}),
};
