import { STATUS_CODE } from '@sunami/constants';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { CreateUserBody, CreateUserParams, CreateUserQuery } from '../../types/routes';

export const createUserController = async (
  req: Request<CreateUserParams, unknown, CreateUserBody, CreateUserQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { stores, ...incomingUser } = req.body;

    const id = crypto.randomUUID();

    await db.user.create({
      data: {
        ...incomingUser,
        id,
      },
    });

    await db.userStore.createMany({
      data: stores.map((s) => ({ ...s, userId: id, id: crypto.randomUUID() })),
    });

    res.status(STATUS_CODE.OKAY).json({ id });
  } catch (e: any | unknown) {
    next(e);
  }
};
