import { z } from 'zod';

export type SuperuserAdminFormType = {
  name: string;
  email: string;
};

export type SuperuserSelfAdminFormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const DEFAULT_FORM_VALUES: SuperuserAdminFormType = {
  name: '',
  email: '',
};

export const DEFAULT_FORM_VALUES_SELF: SuperuserSelfAdminFormType = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const superuserAdminFormSchema = z
  .object({
    email: z.string().min(1).max(256).email(),
    name: z.string().min(1).max(256),
  })
  .strict();

export const superuserSelfAdminFormSchema = z
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
