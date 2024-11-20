import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { GetUserBody, GetUserParams, GetUserQuery } from '../../types/routes';

export const getUserController = async (
  req: Request<GetUserParams, unknown, GetUserBody, GetUserQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getUser' });
};
