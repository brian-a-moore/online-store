import { z } from 'zod';

export type TeamMemberDashboardParamsFormType = {
  page: string;
  search?: string;
  searchKey: 'name' | 'email';
  roleFilter: 'all' | 'manager' | 'editor';
};

export const DEFAULT_FORM_VALUES: TeamMemberDashboardParamsFormType = {
  page: '1',
  search: '',
  searchKey: 'name',
  roleFilter: 'all',
};

export const teamMemberDashboardParamsFormSchema = z
  .object({
    page: z.string().min(1).max(3),
    search: z.string().min(0).max(256),
    searchKey: z.enum(['name', 'email']),
    roleFilter: z.enum(['all', 'manager', 'editor']),
  })
  .strict();
