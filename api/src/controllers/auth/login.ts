import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { AuthLoginBody, AuthLoginParams, AuthLoginQuery } from '../../types/routes';

export const authLoginController = async (
  req: Request<AuthLoginParams, unknown, AuthLoginBody, AuthLoginQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'authLogin' });
};
