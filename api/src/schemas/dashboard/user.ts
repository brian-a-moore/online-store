import z from 'zod';
import { empty, strShort } from '../_presets';

export const searchUsersDashboardSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      search: strShort,
      field: z.enum(['email', 'name']),
      page: z.string().min(1).max(6),
    })
    .strict(),
};
