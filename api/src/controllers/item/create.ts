import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { CreateItemBody, CreateItemParams, CreateItemQuery } from '../../types/routes';

export const createItemController = async (
  req: Request<CreateItemParams, unknown, CreateItemBody, CreateItemQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'createItem' });
};
