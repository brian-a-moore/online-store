import { hashString } from '@sunami/auth';
import { STATUS_CODE } from '@sunami/constants';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { CreateUserBody, CreateUserParams, CreateUserQuery } from '../../types/routes';
import { generatePassword } from '../../utils/auth';

export const createUserController = async (
  req: Request<CreateUserParams, unknown, CreateUserBody, CreateUserQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { stores, ...incomingUser } = req.body;

    const id = crypto.randomUUID();
    const defaultPassword = generatePassword();
    const defaultPasswordHash = await hashString(defaultPassword);

    await db.user.create({
      data: {
        ...incomingUser,
        id,
        password: defaultPasswordHash,
      },
    });

    await db.userStore.createMany({
      data: stores.map((s) => ({ ...s, userId: id, id: crypto.randomUUID() })),
    });

    res.status(STATUS_CODE.OKAY).json({ id, defaultPassword });
  } catch (e: any | unknown) {
    next(e);
  }
};
