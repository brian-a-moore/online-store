import { createToken, verifyToken } from '@sunami/auth';
import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { db } from '../../config/db';
import logger from '../../config/logger';
import {
  AuthVerifyTokenBody,
  AuthVerifyTokenParams,
  AuthVerifyTokenQuery,
  AuthVerifyTokenResponse,
} from '../../types/routes';

export const authVerifyTokenController = async (
  req: Request<AuthVerifyTokenParams, unknown, AuthVerifyTokenBody, AuthVerifyTokenQuery>,
  res: Response<AuthVerifyTokenResponse>,
) => {
  try {
    logger.debug('Verifying token', { token: req.body.token });

    const { id } = await verifyToken<{ id: string }>(req.body.token);
    await db.user.findUniqueOrThrow({ where: { id } });
    const refreshToken = await createToken({ id });

    logger.debug('Successfully verified token', { id });

    res.status(STATUS_CODE.OKAY).json({
      user: { id },
      refreshToken,
    });
  } catch (e: any | unknown) {
    logger.error('Unable to verify token', { token: req.body.token, error: e.message, stack: e.stack });
    res.status(STATUS_CODE.NO_AUTH).send();
  }
};
