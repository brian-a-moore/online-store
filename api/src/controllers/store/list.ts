import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import {
  ListStoresPrivateBody,
  ListStoresPrivateParams,
  ListStoresPrivateQuery,
  ListStoresPublicBody,
  ListStoresPublicParams,
  ListStoresPublicQuery,
} from '../../types/routes';

export const listStoresPublicController = async (
  req: Request<ListStoresPublicParams, unknown, ListStoresPublicBody, ListStoresPublicQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listStoresPublic' });
};

export const listStoresPrivateController = async (
  req: Request<ListStoresPrivateParams, unknown, ListStoresPrivateBody, ListStoresPrivateQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listStoresPrivate' });
};
