import { z } from 'zod';
import { empty, uuid } from './_presets';

export const getBreadcrumbSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      storeId: uuid,
      productId: uuid.optional(),
      itemId: uuid.optional(),
    })
    .strict(),
};
