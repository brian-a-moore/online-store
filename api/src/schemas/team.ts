import { z } from 'zod';
import { empty } from './_presets';

export const getTeamSchema = {
  body: empty,
  params: empty,
  query: z.object({
    page: z.string().min(1).max(6),
    storeId: z.string().min(36).max(36).optional(), // if left out, all stores users are returned
    roleId: z.string().min(1).max(1).optional(), // if left out, users of all roles are returned
  }),
};
