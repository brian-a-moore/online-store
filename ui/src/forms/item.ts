import { z } from 'zod';

export type EditItemForm = {
  name: string;
  description: string;
  isPublished: boolean;
};

export const EDIT_ITEM_FORM_INITIAL_VALUES: EditItemForm = {
  name: '',
  description: '',
  isPublished: false,
};

export const EditItemFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    isPublished: z.boolean(),
  })
  .strict();
