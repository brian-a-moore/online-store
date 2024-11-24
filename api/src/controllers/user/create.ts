import { hashString } from '@sunami/auth';
import { STATUS_CODE } from '@sunami/constants';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { CreateUserBody, CreateUserParams, CreateUserQuery, CreateUserResponse } from '../../types/api';
import { generatePassword } from '../../utils/auth';

export const createUserController = async (
  req: Request<CreateUserParams, unknown, CreateUserBody, CreateUserQuery>,
  res: Response<CreateUserResponse>,
  next: NextFunction,
) => {
  try {
    const { store, ...incomingUser } = req.body;

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

    if (store) {
      await db.userStore.create({
        data: {
          ...store,
          userId: id,
        },
      });
    }

    res.status(STATUS_CODE.OKAY).json({ id, defaultPassword });
  } catch (e: any | unknown) {
    next(e);
  }
};
