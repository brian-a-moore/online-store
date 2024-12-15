import { z } from 'zod';
import * as mediaSchema from '../../../schemas/media';

export type GetImageMediaBody = z.infer<
  typeof mediaSchema.getImageMediaSchema.body
>;
export type GetImageMediaParams = z.infer<
  typeof mediaSchema.getImageMediaSchema.params
>;
export type GetImageMediaQuery = z.infer<
  typeof mediaSchema.getImageMediaSchema.query
>;
export type GetImageMediaResponse = Blob;

export type UploadImageMediaBody = z.infer<
  typeof mediaSchema.uploadImageMediaSchema.body
>;
export type UploadImageMediaParams = z.infer<
  typeof mediaSchema.uploadImageMediaSchema.params
>;
export type UploadImageMediaQuery = z.infer<
  typeof mediaSchema.uploadImageMediaSchema.query
>;
export type UploadImageMediaResponse = { id: string };
