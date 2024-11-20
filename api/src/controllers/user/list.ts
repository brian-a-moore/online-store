import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { ListUsersBody, ListUsersParams, ListUsersQuery } from '../../types/routes';

export const listUsersController = async (
  req: Request<ListUsersParams, unknown, ListUsersBody, ListUsersQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listUsersController' });
};
