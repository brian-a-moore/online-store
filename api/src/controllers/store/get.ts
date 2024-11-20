import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import {
  GetStorePrivateBody,
  GetStorePrivateParams,
  GetStorePrivateQuery,
  GetStorePublicBody,
  GetStorePublicParams,
  GetStorePublicQuery,
} from '../../types/routes';

export const getStorePublicController = async (
  req: Request<GetStorePublicParams, unknown, GetStorePublicBody, GetStorePublicQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getStorePublic' });
};

export const getStorePrivateController = async (
  req: Request<GetStorePrivateParams, unknown, GetStorePrivateBody, GetStorePrivateQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getStorePrivate' });
};
