import { z } from 'zod';

export type EditUserForm = {
  name: string;
  email: string;
};

export const EDIT_USER_FORM_INITIAL_VALUES: EditUserForm = {
  name: '',
  email: '',
};

export const EditUserFormSchema = z
  .object({
    email: z.string().min(1).max(256).email(),
    name: z.string().min(1).max(256),
  })
  .strict();
