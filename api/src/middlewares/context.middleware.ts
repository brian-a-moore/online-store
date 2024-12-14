import { getCurrentInvoke } from '@codegenie/serverless-express';
import { ENV_TYPE } from '@sunami/constants';
import * as cls from 'cls-hooked';
import { NextFunction, Request, Response } from 'express';

export const namespace = cls.createNamespace('request');

export default (req: Request, _: Response, next: NextFunction) => {
  let ctx = {
    awsRequestId: 'none',
  };
  if (process.env.APP_ENV === ENV_TYPE.PROD) {
    const { context } = getCurrentInvoke();
    ctx = context;
  }
  namespace.run(() => {
    namespace.set(
      'routeId',
      req.method.replace(/\//g, '-').toLowerCase() +
        req.originalUrl.replace(/[_/]/g, '-'),
    );
    namespace.set('requestId', ctx.awsRequestId || 'none');
    next();
  });
};
