import { z } from 'zod';
import * as mediaSchema from '../../../schemas/media';

export type DeleteImageMediaBody = z.infer<
  typeof mediaSchema.deleteImageMediaSchema.body
>;
export type DeleteImageMediaParams = z.infer<
  typeof mediaSchema.deleteImageMediaSchema.params
>;
export type DeleteImageMediaQuery = z.infer<
  typeof mediaSchema.deleteImageMediaSchema.query
>;
export type DeleteImageMediaResponse = void;

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
export type UploadImageMediaResponse = { filePath: string };
