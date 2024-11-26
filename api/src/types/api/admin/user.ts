import { z } from 'zod';
import * as adminUser from '../../../schemas/admin/user';

export type CreateUserAdminBody = z.infer<typeof adminUser.createUserAdminSchema.body>;
export type CreateUserAdminParams = z.infer<typeof adminUser.createUserAdminSchema.params>;
export type CreateUserAdminQuery = z.infer<typeof adminUser.createUserAdminSchema.query>;
export type CreateUserAdminResponse = { id: string; defaultPassword: string };

export type ListUsersAdminBody = z.infer<typeof adminUser.listUsersAdminSchema.body>;
export type ListUsersAdminParams = z.infer<typeof adminUser.listUsersAdminSchema.params>;
export type ListUsersAdminQuery = z.infer<typeof adminUser.listUsersAdminSchema.query>;
export type ListUsersAdminResponse = {
  users: {
    email: string;
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type GetUserAdminBody = z.infer<typeof adminUser.getUserAdminSchema.body>;
export type GetUserAdminParams = z.infer<typeof adminUser.getUserAdminSchema.params>;
export type GetUserAdminQuery = z.infer<typeof adminUser.getUserAdminSchema.query>;
export type GetUserAdminResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UpdateUserAdminBody = z.infer<typeof adminUser.updateUserAdminSchema.body>;
export type UpdateUserAdminParams = z.infer<typeof adminUser.updateUserAdminSchema.params>;
export type UpdateUserAdminQuery = z.infer<typeof adminUser.updateUserAdminSchema.query>;
export type UpdateUserAdminResponse = never;

export type DeleteUserAdminBody = z.infer<typeof adminUser.deleteUserAdminSchema.body>;
export type DeleteUserAdminParams = z.infer<typeof adminUser.deleteUserAdminSchema.params>;
export type DeleteUserAdminQuery = z.infer<typeof adminUser.deleteUserAdminSchema.query>;
export type DeleteUserAdminResponse = never;

export type ResetUserPasswordAdminBody = z.infer<typeof adminUser.resetUserPasswordAdminSchema.body>;
export type ResetUserPasswordAdminParams = z.infer<typeof adminUser.resetUserPasswordAdminSchema.params>;
export type ResetUserPasswordAdminQuery = z.infer<typeof adminUser.resetUserPasswordAdminSchema.query>;
export type ResetUserPasswordAdminResponse = { newPassword: string };
