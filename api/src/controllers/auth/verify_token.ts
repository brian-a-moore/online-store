import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { AuthVerifyTokenBody, AuthVerifyTokenParams, AuthVerifyTokenQuery } from '../../types/routes';

export const authVerifyTokenController = async (
  req: Request<AuthVerifyTokenParams, unknown, AuthVerifyTokenBody, AuthVerifyTokenQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'authVerifyToken' });
};
