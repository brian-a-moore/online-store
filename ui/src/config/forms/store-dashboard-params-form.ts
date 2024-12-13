import { z } from 'zod';

export type StoreDashboardParamsFormType = {
  page: string;
  search?: string;
  statusFilter: 'all' | 'public' | 'unlisted';
};

export const DEFAULT_FORM_VALUES: StoreDashboardParamsFormType = {
  page: '1',
  search: '',
  statusFilter: 'all',
};

export const storeDashboardParamsFormSchema = z
  .object({
    page: z.string().min(1).max(3),
    search: z.string().min(0).max(256),
    statusFilter: z.enum(['all', 'public', 'unlisted']),
  })
  .strict();
