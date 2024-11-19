import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { ZodObject } from 'zod';
import logger from '../config/logger';

export default (schema: { body: ZodObject<any>; params: ZodObject<any>; query: ZodObject<any> }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.debug('SCHEMA VALIDATOR MIDDLEWARE: Validating schema...');

      req.body = schema.body.parse(req.body);
      req.params = schema.params.parse(req.params);
      req.query = schema.query.parse(req.query);

      logger.debug('SCHEMA VALIDATOR MIDDLEWARE: Schema validated');

      next();
    } catch (e: any | unknown) {
      logger.error('SCHEMA VALIDATOR MIDDLEWARE: Schema validation failed', {
        error: e.message,
        stack: e.stack,
        params: req.params,
        body: req.body,
        query: req.query,
      });
      res.status(STATUS_CODE.BAD_INPUT).json({});
    }
  };
};
