import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import {
  ListItemsPrivateBody,
  ListItemsPrivateParams,
  ListItemsPrivateQuery,
  ListItemsPublicBody,
  ListItemsPublicParams,
  ListItemsPublicQuery,
} from '../../types/routes';

export const listItemsPublicController = async (
  req: Request<ListItemsPublicParams, unknown, ListItemsPublicBody, ListItemsPublicQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listItemsPublic' });
};

export const listItemsPrivateController = async (
  req: Request<ListItemsPrivateParams, unknown, ListItemsPrivateBody, ListItemsPrivateQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listItemsPrivate' });
};
