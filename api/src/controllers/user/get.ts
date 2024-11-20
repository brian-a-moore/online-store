import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { GetUserBody, GetUserParams, GetUserQuery } from '../../types/routes';

export const getUserController = async (
  req: Request<GetUserParams, unknown, GetUserBody, GetUserQuery>,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.params;

  try {
    const user = await db.user.findUniqueOrThrow({ where: { id: userId } });

    res.status(STATUS_CODE.OKAY).json({ user });
  } catch (e: any | unknown) {
    next(e);
  }
};
