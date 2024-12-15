import z from 'zod';
import { empty, uuid } from '../_presets';

export const getImageMediaSchema = {
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

export const uploadImageMediaSchema = {
  body: z
    .object({
      image: z.any(),
    })
    .strict(),
  params: empty,
  query: z
    .object({
      storeId: uuid.optional(),
      productId: uuid.optional(),
      itemId: uuid.optional(),
    })
    .strict(),
};
