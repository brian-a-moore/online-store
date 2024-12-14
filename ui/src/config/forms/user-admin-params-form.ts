import { z } from 'zod';

export type UserDashboardParamsFormType = {
  page: string;
  search?: string;
  searchKey: 'name' | 'email';
  statusFilter: 'all' | 'public' | 'unlisted';
};

export const DEFAULT_FORM_VALUES: UserDashboardParamsFormType = {
  page: '1',
  search: '',
  searchKey: 'name',
  statusFilter: 'all',
};

export const userDashboardParamsFormSchema = z
  .object({
    page: z.string().min(1).max(3),
    search: z.string().min(0).max(256),
    searchKey: z.enum(['name', 'email']),
    statusFilter: z.enum(['all', 'public', 'unlisted']),
  })
  .strict();
