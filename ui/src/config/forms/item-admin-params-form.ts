import { z } from 'zod';

export type ItemAdminParamsFormType = {
  page: string;
  search?: string;
  searchKey: 'name' | 'product.name';
  statusFilter: 'all' | 'public' | 'unlisted';
};

export const DEFAULT_FORM_VALUES: ItemAdminParamsFormType = {
  page: '1',
  search: '',
  searchKey: 'name',
  statusFilter: 'all',
};

export const itemAdminParamsFormSchema = z
  .object({
    page: z.string().min(1).max(3),
    search: z.string().min(0).max(256),
    searchKey: z.enum(['name', 'product.name']),
    statusFilter: z.enum(['all', 'public', 'unlisted']),
  })
  .strict();
