import { NextFunction, Request, Response } from 'express';

export default (req: Request, _: Response, next: NextFunction) => {
  req.routeId =
    req.method.replace(/\//g, '-').toLowerCase() +
    req.originalUrl.replace(/[_/]/g, '-');
  next();
};
