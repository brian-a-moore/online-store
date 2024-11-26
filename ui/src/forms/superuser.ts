import { z } from 'zod';

export type EditSuperuserForm = {
  name: string;
  email: string;
};

export type EditSelfForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const EDIT_SUPERUSER_FORM_INITIAL_VALUES: EditSuperuserForm = {
  name: '',
  email: '',
};

export const EDIT_SELF_INITIAL_VALUES: EditSelfForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const EditSuperuserFormSchema = z
  .object({
    email: z.string().min(1).max(256).email(),
    name: z.string().min(1).max(256),
  })
  .strict();

export const EditSelfFormSchema = z
  .object({
    email: z.string().min(1).max(256).email(),
    name: z.string().min(1).max(256),
    password: z.string().min(8).max(256),
    confirmPassword: z.string().min(8).max(256),
  })
  .strict()
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
