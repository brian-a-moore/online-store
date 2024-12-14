import { z } from 'zod';
import * as breadcrumbSchema from '../../../schemas/dashboard/breadcrumb';

export type GetBreadcrumbDashboardBody = z.infer<
  typeof breadcrumbSchema.getBreadcrumbDashboardSchema.body
>;
export type GetBreadcrumbDashboardParams = z.infer<
  typeof breadcrumbSchema.getBreadcrumbDashboardSchema.params
>;
export type GetBreadcrumbDashboardQuery = z.infer<
  typeof breadcrumbSchema.getBreadcrumbDashboardSchema.query
>;
export type GetBreadcrumbDashboardResponse = {
  crumbs: {
    name: string;
    id: string;
  }[];
};
