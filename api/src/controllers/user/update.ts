import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { UpdateUserBody, UpdateUserParams, UpdateUserQuery, UpdateUserResponse } from '../../types/api';

export const updateUserController = async (
  req: Request<UpdateUserParams, unknown, UpdateUserBody, UpdateUserQuery>,
  res: Response<UpdateUserResponse>,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const updatedUserFields = req.body;

    await db.user.update({ data: updatedUserFields, where: { id: userId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
