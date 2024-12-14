import { z } from 'zod';

export type StoreAdminParamsFormType = {
  page: string;
  search?: string;
  statusFilter: 'all' | 'public' | 'unlisted';
};

export const DEFAULT_FORM_VALUES: StoreAdminParamsFormType = {
  page: '1',
  search: '',
  statusFilter: 'all',
};

export const storeAdminParamsFormSchema = z
  .object({
    page: z.string().min(1).max(3),
    search: z.string().min(0).max(256),
    statusFilter: z.enum(['all', 'public', 'unlisted']),
  })
  .strict();
