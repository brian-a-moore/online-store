import { verifyToken } from '@sunami/auth';
import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../config/db';
import logger from '../config/logger';

export default async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  try {
    // Bypass authorization for certain routes
    if (req.routeId?.includes('-auth') || req.routeId?.includes('-public')) {
      logger.debug(
        'AUTHORIZATION MIDDLEWARE: Authorization middleware: Bypassed',
      );
      next();
      return;
    }

    // If no authorization header is provided, return an error
    if (!authorizationHeader) {
      throw new Error('Authorization not provided');
    }

    const [authType, authToken] = authorizationHeader.split(' ');

    // If the authorization type is not Bearer, return an error
    if (authType !== 'Bearer') {
      throw new Error('Authentication type is not supported');
    }

    // Verify the token
    const decodedToken = verifyToken<{ id: string; domain: 'admin' | 'user' }>(
      authToken,
    );
    logger.debug('AUTHORIZATION MIDDLEWARE: Token verified', { decodedToken });

    const userId = decodedToken.id;
    let userCount;

    // Count the number of users with the provided ID, based on whether they are an admin or not
    if (decodedToken.domain === 'admin') {
      userCount = await db.superuser.findUniqueOrThrow({
        where: { id: userId },
      });
    } else {
      userCount = await db.user.findUniqueOrThrow({ where: { id: userId } });
    }

    // If no user is found, return an error
    if (!userCount) {
      throw new Error('Account not found');
    }

    // If a user is found, add their data to the request and continue
    logger.debug('AUTHORIZATION MIDDLEWARE: Account found -- Continuing...', {
      decodedToken,
    });
    req.user = decodedToken;
    next();
  } catch (error: any | unknown) {
    logger.error('AUTHORIZATION MIDDLEWARE: Unable to authorize', {
      error: error.message,
      stack: error.stack,
    });
    res.status(STATUS_CODE.NO_AUTH).json({});
  }
};
