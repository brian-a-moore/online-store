import { z } from 'zod';

export type EditProductForm = {
  name: string;
  description: string;
};

export const EDIT_PRODUCT_FORM_INITIAL_VALUES: EditProductForm = {
  name: '',
  description: '',
};

export const EditProductFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
  })
  .strict();
