import { z } from 'zod';
import { empty, uuid } from '../_presets';

export const getBreadcrumbDashboardSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      storeId: uuid.optional(),
      productId: uuid.optional(),
      itemId: uuid.optional(),
    })
    .strict(),
};
