import { z } from 'zod';
import * as adminSuperuser from '../../../schemas/admin/superuser';

export type CreateSuperuserAdminBody = z.infer<
  typeof adminSuperuser.createSuperuserAdminSchema.body
>;
export type CreateSuperuserAdminParams = z.infer<
  typeof adminSuperuser.createSuperuserAdminSchema.params
>;
export type CreateSuperuserAdminQuery = z.infer<
  typeof adminSuperuser.createSuperuserAdminSchema.query
>;
export type CreateSuperuserAdminResponse = {
  id: string;
  defaultPassword: string;
};

export type ListSuperusersAdminBody = z.infer<
  typeof adminSuperuser.listSuperusersAdminSchema.body
>;
export type ListSuperusersAdminParams = z.infer<
  typeof adminSuperuser.listSuperusersAdminSchema.params
>;
export type ListSuperusersAdminQuery = z.infer<
  typeof adminSuperuser.listSuperusersAdminSchema.query
>;
export type ListSuperusersAdminResponse = {
  superusers: {
    email: string;
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export type GetSuperuserAdminBody = z.infer<
  typeof adminSuperuser.getSuperuserAdminSchema.body
>;
export type GetSuperuserAdminParams = z.infer<
  typeof adminSuperuser.getSuperuserAdminSchema.params
>;
export type GetSuperuserAdminQuery = z.infer<
  typeof adminSuperuser.getSuperuserAdminSchema.query
>;
export type GetSuperuserAdminResponse = {
  superuser: {
    email: string;
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UpdateSuperuserAdminBody = z.infer<
  typeof adminSuperuser.updateSuperuserAdminSchema.body
>;
export type UpdateSuperuserAdminParams = z.infer<
  typeof adminSuperuser.updateSuperuserAdminSchema.params
>;
export type UpdateSuperuserAdminQuery = z.infer<
  typeof adminSuperuser.updateSuperuserAdminSchema.query
>;
export type UpdateSuperuserAdminResponse = never;

export type DeleteSuperuserAdminBody = z.infer<
  typeof adminSuperuser.deleteSuperuserAdminSchema.body
>;
export type DeleteSuperuserAdminParams = z.infer<
  typeof adminSuperuser.deleteSuperuserAdminSchema.params
>;
export type DeleteSuperuserAdminQuery = z.infer<
  typeof adminSuperuser.deleteSuperuserAdminSchema.query
>;
export type DeleteSuperuserAdminResponse = never;

export type ResetSuperuserPasswordAdminBody = z.infer<
  typeof adminSuperuser.resetSuperuserPasswordAdminSchema.body
>;
export type ResetSuperuserPasswordAdminParams = z.infer<
  typeof adminSuperuser.resetSuperuserPasswordAdminSchema.params
>;
export type ResetSuperuserPasswordAdminQuery = z.infer<
  typeof adminSuperuser.resetSuperuserPasswordAdminSchema.query
>;
export type ResetSuperuserPasswordAdminResponse = { newPassword: string };
