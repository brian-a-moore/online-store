import { z } from 'zod';
import { empty } from './_presets';

export const getTeamSchema = {
  body: empty,
  params: z.object({
    storeId: z.string().min(36).max(36),
  }),
  query: z.object({
    page: z.string().min(1).max(6),
  }),
};
