import { z } from 'zod';

export type SuperuserAdminParamsFormType = {
  page: string;
  search?: string;
  searchKey: 'name' | 'email';
};

export const DEFAULT_FORM_VALUES: SuperuserAdminParamsFormType = {
  page: '1',
  search: '',
  searchKey: 'name',
};

export const superuserAdminParamsFormSchema = z
  .object({
    page: z.string().min(1).max(3),
    search: z.string().min(0).max(256),
    searchKey: z.enum(['name', 'email']),
  })
  .strict();
