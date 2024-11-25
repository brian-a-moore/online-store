import z from 'zod';
import { empty, strShort } from '../_presets';

export const loginAuthSchema = {
  body: z
    .object({
      email: strShort.email(),
      password: strShort,
    })
    .strict(),
  params: empty,
  query: z
    .object({
      domain: z.enum(['admin', 'user']),
    })
    .strict(),
};

export const verifyTokenAuthSchema = {
  body: z
    .object({
      token: z.string(),
    })
    .strict(),
  params: empty,
  query: empty,
};

export const changePasswordAuthSchema = {
  body: z
    .object({
      password: strShort,
    })
    .strict(),
  params: empty,
  query: empty,
};
