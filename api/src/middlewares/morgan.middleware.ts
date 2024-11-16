import { Request, Response } from "express";
import logger from "../config/logger";

export default (tokens: any, req: Request, res: Response) => {
  logger.debug("MORGAN MIDDLEWARE: HTTP Request", {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: tokens["response-time"](req, res),
  });
  return undefined;
};
