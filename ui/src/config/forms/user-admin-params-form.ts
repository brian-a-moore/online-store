import { z } from 'zod';

export type UserAdminParamsFormType = {
  page: string;
  search?: string;
  searchKey: 'name' | 'email';
};

export const DEFAULT_FORM_VALUES: UserAdminParamsFormType = {
  page: '1',
  search: '',
  searchKey: 'name',
};

export const userAdminParamsFormSchema = z
  .object({
    page: z.string().min(1).max(3),
    search: z.string().min(0).max(256),
    searchKey: z.enum(['name', 'email']),
  })
  .strict();
