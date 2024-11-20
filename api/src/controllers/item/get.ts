import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import {
  GetItemPrivateBody,
  GetItemPrivateParams,
  GetItemPrivateQuery,
  GetItemPublicBody,
  GetItemPublicQuery,
} from '../../types/routes';

export const getItemPublicController = async (
  req: Request<GetItemPrivateParams, unknown, GetItemPublicBody, GetItemPublicQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getItemPublic' });
};

export const getItemPrivateController = async (
  req: Request<GetItemPrivateParams, unknown, GetItemPrivateBody, GetItemPrivateQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getItemPrivate' });
};
