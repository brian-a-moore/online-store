import { z } from 'zod';

export type ProductDashboardFormType = {
  name: string;
  description: string;
  isPublished: boolean;
};

export const DEFAULT_FORM_VALUES: ProductDashboardFormType = {
  name: '',
  description: '',
  isPublished: false,
};

export const productDashboardFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    isPublished: z.boolean(),
  })
  .strict();
