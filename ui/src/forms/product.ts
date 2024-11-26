import { z } from 'zod';

export type EditProductForm = {
  name: string;
  description: string;
  isPublished: boolean;
};

export const EDIT_PRODUCT_FORM_INITIAL_VALUES: EditProductForm = {
  name: '',
  description: '',
  isPublished: false,
};

export const EditProductFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    isPublished: z.boolean(),
  })
  .strict();
