import { z } from 'zod';
import { empty, strShort } from './_presets';

export const authLoginSchema = {
  body: z
    .object({
      email: strShort.email(),
      password: strShort,
    })
    .strict(),
  params: empty,
  query: empty,
};

export const authVerifyTokenSchema = {
  body: z
    .object({
      token: z.string(),
    })
    .strict(),
  params: empty,
  query: empty,
};
