import { compareStrings, createToken, verifyToken } from '@sunami/auth';
import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import logger from '../../config/logger';
import {
  ErrorResponse,
  LoginAuthBody,
  LoginAuthParams,
  LoginAuthQuery,
  LoginAuthResponse,
  VerifyTokenAuthBody,
  VerifyTokenAuthParams,
  VerifyTokenAuthQuery,
  VerifyTokenAuthResponse,
} from '../../types/api';

export const loginAuthController = async (
  req: Request<LoginAuthParams, unknown, LoginAuthBody, LoginAuthQuery>,
  res: Response<LoginAuthResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const { domain } = req.query;

    let user;

    if (domain === 'admin') {
      user = await db.superuser.findUniqueOrThrow({ select: { id: true, password: true }, where: { email } });
    } else {
      user = await db.user.findUniqueOrThrow({ select: { id: true, password: true }, where: { email } });
    }

    const isPasswordValid = await compareStrings(password, user.password);

    if (!isPasswordValid) {
      logger.warn(`User with email ${email} tried to login with invalid password`);
      res.status(STATUS_CODE.BAD_INPUT).json({ message: 'Password incorrect' });
      return;
    }

    const token = createToken({ id: user.id, domain });

    res.status(STATUS_CODE.OKAY).json({ user: { id: user.id, domain }, token });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const verifyTokenAuthController = async (
  req: Request<VerifyTokenAuthParams, unknown, VerifyTokenAuthBody, VerifyTokenAuthQuery>,
  res: Response<VerifyTokenAuthResponse | ErrorResponse>,
) => {
  try {
    logger.debug('Verifying token', { token: req.body.token });

    const { id, domain } = await verifyToken<{ id: string; domain: 'admin' | 'user' }>(req.body.token);

    if (domain === 'admin') {
      await db.superuser.findUniqueOrThrow({ where: { id } });
    } else {
      await db.user.findUniqueOrThrow({ where: { id } });
    }
    const refreshToken = await createToken({ id, domain });

    logger.debug('Successfully verified token', { id, domain });

    res.status(STATUS_CODE.OKAY).json({
      user: { id, domain },
      refreshToken,
    });
  } catch (e: any | unknown) {
    logger.error('Unable to verify token', { token: req.body.token, error: e.message, stack: e.stack });
    res.status(STATUS_CODE.NO_AUTH).send();
  }
};

export const changePasswordAuthController = async () => {};
