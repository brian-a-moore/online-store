import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { UpdateUserBody, UpdateUserParams, UpdateUserQuery } from '../../types/routes';

export const updateUserController = async (
  req: Request<UpdateUserParams, unknown, UpdateUserBody, UpdateUserQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'updateUser' });
};
