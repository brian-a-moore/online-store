import z from 'zod';
import { empty, strLong, strLongOptional, uuid } from '../_presets';

export const deleteImageMediaSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      filePath: strLong,
    })
    .strict(),
};

export const getImageMediaSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      filePath: strLongOptional,
    })
    .strict(),
};

export const uploadImageMediaSchema = {
  body: z.object({}), // TODO: Fix this later
  params: empty,
  query: z
    .object({
      storeId: uuid.optional(),
      productId: uuid.optional(),
      itemId: uuid.optional(),
    })
    .strict(),
};
