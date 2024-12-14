import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { prismaCodeToStatusCode } from '../config/db';
import logger from '../config/logger';

export default (
  err: any | unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    logger.debug('ERROR HANDLING MIDDLEWARE: No error found - Continuing...');
    return next();
  }
  if (res.headersSent) {
    logger.warn(
      'ERROR HANDLING MIDDLEWARE: Headers already sent - Skipping...',
    );
    next();
  }
  logger.error('ERROR HANDLING MIDDLEWARE: Error found', {
    error: err.message,
    stack: err.stack,
  });

  if (err.code) {
    const { status, message } = prismaCodeToStatusCode(err.code);
    err.status = status;
    err.message = message;
  }

  res
    .status(err.status || STATUS_CODE.SERVER_ERROR)
    .send({ message: err.message || 'Internal server error' });
};
