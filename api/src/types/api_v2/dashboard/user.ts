import { z } from 'zod';
import * as userSchema from '../../../schemas_v2/dashboard/user';

export type SearchUsersDashboardBody = z.infer<typeof userSchema.searchUsersDashboardSchema>['body'];
export type SearchUsersDashboardParams = z.infer<typeof userSchema.searchUsersDashboardSchema>['params'];
export type SearchUsersDashboardQuery = z.infer<typeof userSchema.searchUsersDashboardSchema>['query'];
