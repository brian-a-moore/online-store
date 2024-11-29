import { z } from 'zod';

export type ProductAdminFormType = {
  name: string;
  description: string;
  isPublished: boolean;
};

export const DEFAULT_FORM_VALUES: ProductAdminFormType = {
  name: '',
  description: '',
  isPublished: false,
};

export const productAdminFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    isPublished: z.boolean(),
  })
  .strict();
