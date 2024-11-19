import { z } from 'zod';

export const createCheckoutSessionSchema = {
  body: z.object({}),
  params: z.object({}),
};
