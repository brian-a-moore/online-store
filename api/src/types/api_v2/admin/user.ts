import { z } from 'zod';
import * as adminUser from '../../../schemas_v2/admin/user';

export type CreateUserAdminBody = z.infer<typeof adminUser.createUserAdminSchema.body>;
export type CreateUserAdminParams = z.infer<typeof adminUser.createUserAdminSchema.params>;
export type CreateUserAdminQuery = z.infer<typeof adminUser.createUserAdminSchema.query>;

export type ListUsersAdminBody = z.infer<typeof adminUser.listUsersAdminSchema.body>;
export type ListUsersAdminParams = z.infer<typeof adminUser.listUsersAdminSchema.params>;
export type ListUsersAdminQuery = z.infer<typeof adminUser.listUsersAdminSchema.query>;

export type GetUserAdminBody = z.infer<typeof adminUser.getUserAdminSchema.body>;
export type GetUserAdminParams = z.infer<typeof adminUser.getUserAdminSchema.params>;
export type GetUserAdminQuery = z.infer<typeof adminUser.getUserAdminSchema.query>;

export type UpdateUserAdminBody = z.infer<typeof adminUser.updateUserAdminSchema.body>;
export type UpdateUserAdminParams = z.infer<typeof adminUser.updateUserAdminSchema.params>;
export type UpdateUserAdminQuery = z.infer<typeof adminUser.updateUserAdminSchema.query>;

export type DeleteUserAdminBody = z.infer<typeof adminUser.deleteUserAdminSchema.body>;
export type DeleteUserAdminParams = z.infer<typeof adminUser.deleteUserAdminSchema.params>;
export type DeleteUserAdminQuery = z.infer<typeof adminUser.deleteUserAdminSchema.query>;
