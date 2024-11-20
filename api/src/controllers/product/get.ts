import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import {
  GetProductPrivateBody,
  GetProductPrivateParams,
  GetProductPrivateQuery,
  GetProductPublicBody,
  GetProductPublicParams,
  GetProductPublicQuery,
} from '../../types/routes';

export const getProductPublicController = async (
  req: Request<GetProductPublicParams, unknown, GetProductPublicBody, GetProductPublicQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getProductPublic' });
};

export const getProductPrivateController = async (
  req: Request<GetProductPrivateParams, unknown, GetProductPrivateBody, GetProductPrivateQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getProductPrivate' });
};
