import { z } from 'zod';

export type UserAdminFormType = {
  name: string;
  email: string;
};

export const DEFAULT_FORM_VALUES: UserAdminFormType = {
  name: '',
  email: '',
};

export const userAdminFormSchema = z
  .object({
    email: z.string().min(1).max(256).email(),
    name: z.string().min(1).max(256),
  })
  .strict();
