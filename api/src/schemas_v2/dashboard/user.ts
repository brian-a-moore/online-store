import z from 'zod';
import { empty, strShort, uuid } from '../_presets';

export const searchUsersDashboardSchema = {
  body: z
    .object({
      storeId: uuid,
      search: strShort,
      field: z.enum(['email', 'name']),
      page: z.string().min(1).max(6),
    })
    .strict(),
  params: empty,
  query: empty,
};
