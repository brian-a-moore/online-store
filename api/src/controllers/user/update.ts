import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { UpdateUserBody, UpdateUserParams, UpdateUserQuery } from '../../types/routes';

export const updateUserController = async (
  req: Request<UpdateUserParams, unknown, UpdateUserBody, UpdateUserQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId;
    const updatedUserFields = req.body;

    await db.user.update({ data: updatedUserFields, where: { id: userId } });

    res.status(STATUS_CODE.NO_CONTENT).json({});
  } catch (e: any | unknown) {
    next(e);
  }
};
