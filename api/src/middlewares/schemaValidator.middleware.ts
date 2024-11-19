import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import logger from '../config/logger';

export default (schema: { body: ZodSchema<any>; params: ZodSchema<any>; query: ZodSchema<any> }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.debug('SCHEMA VALIDATOR MIDDLEWARE: Validating schema...');
      const validatedBody = schema.body.parse(req.body);
      const validatedParams = schema.params.parse(req.params);
      const validatedQuery = schema.query.parse(req.query);
      req.body = validatedBody;
      req.params = validatedParams;
      req.query = validatedQuery;
      logger.debug('SCHEMA VALIDATOR MIDDLEWARE: Schema validated', { params: validatedParams, body: validatedBody });
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
