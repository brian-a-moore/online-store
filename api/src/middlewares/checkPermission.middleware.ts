import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';

export default (
  permissionChecks: ((req: Request) => Promise<string | false>)[],
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('CHECK PERMISSION MIDDLEWARE: Checking permissions...', {
      permissionChecks: permissionChecks.map((check) => check.name),
    });
    const promises = permissionChecks.map((check) => check(req));
    const results = await Promise.all(promises);
    const result = results.find((result) => result !== false);
    if (!result) {
      logger.debug('CHECK PERMISSION MIDDLEWARE: Permissions granted');
      next();
    } else {
      logger.warn('CHECK PERMISSION MIDDLEWARE: Permissions denied', {
        result,
      });
      res.status(STATUS_CODE.NO_PERM).json({});
    }
  };
};
