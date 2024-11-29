import { z } from 'zod';

export type TeamMemberDashboardFormType = {
  userId: string;
  roleId: number;
};

export const DEFAULT_FORM_VALUES: TeamMemberDashboardFormType = {
  userId: '',
  roleId: 2,
};

export const teamMemberDashboardFormSchema = z
  .object({
    userId: z.string().uuid(),
    roleId: z.number().min(1).max(2),
  })
  .strict();
