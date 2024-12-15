import z from 'zod';
import { empty, uuid } from '../_presets';

export const getImageMediaSchema = {
  body: empty,
  params: empty,
  query: z.object({
    storeId: uuid,
    productId: uuid.optional(),
    itemId: uuid.optional(),
  }),
};

export const uploadImageMediaSchema = {
  body: z
    .object({
      image: z.any(),
    })
    .strict(),
  params: empty,
  query: z
    .object({
      storeId: uuid,
      productId: uuid.optional(),
      itemId: uuid.optional(),
    })
    .strict(),
};
