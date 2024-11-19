import { z } from 'zod';
import { empty, obj, strShort } from './_presets';

export const authLoginSchema = {
  body: obj({
    email: strShort.email(),
    password: strShort,
  }),
  params: empty,
  query: empty,
};

export const authVerifyTokenSchema = {
  body: obj({
    token: z.string(),
  }),
  params: empty,
  query: empty,
};
