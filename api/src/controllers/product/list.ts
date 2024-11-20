import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import {
  ListProductsPrivateBody,
  ListProductsPrivateParams,
  ListProductsPrivateQuery,
  ListProductsPublicBody,
  ListProductsPublicParams,
  ListProductsPublicQuery,
} from '../../types/routes';

export const listProductsPublicController = async (
  req: Request<ListProductsPublicParams, unknown, ListProductsPublicBody, ListProductsPublicQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listProductsPublic' });
};

export const listProductsPrivateController = async (
  req: Request<ListProductsPrivateParams, unknown, ListProductsPrivateBody, ListProductsPrivateQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listProductsPrivate' });
};
