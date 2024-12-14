import { z } from 'zod';

export type ProductAdminParamsFormType = {
  page: string;
  search?: string;
  searchKey: 'name' | 'store.name';
  statusFilter: 'all' | 'public' | 'unlisted';
};

export const DEFAULT_FORM_VALUES: ProductAdminParamsFormType = {
  page: '1',
  search: '',
  searchKey: 'name',
  statusFilter: 'all',
};

export const productAdminParamsFormSchema = z
  .object({
    page: z.string().min(1).max(3),
    search: z.string().min(0).max(256),
    searchKey: z.enum(['name', 'store.name']),
    statusFilter: z.enum(['all', 'public', 'unlisted']),
  })
  .strict();
