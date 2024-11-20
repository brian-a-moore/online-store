import { compareStrings, createToken } from '@sunami/auth';
import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import logger from '../../config/logger';
import { AuthLoginBody, AuthLoginParams, AuthLoginQuery } from '../../types/routes';

export const authLoginController = async (
  req: Request<AuthLoginParams, unknown, AuthLoginBody, AuthLoginQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = await db.user.findUniqueOrThrow({ select: { id: true, password: true }, where: { email } });

    const isPasswordValid = await compareStrings(password, user.password);

    if (!isPasswordValid) {
      logger.warn(`User with email ${email} tried to login with invalid password`);
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Password incorrect' });
      return;
    }

    const token = createToken({ id: user.id });

    res.status(STATUS_CODE.OKAY).json({ id: user.id, token });
  } catch (e: any | unknown) {
    next(e);
  }
};
