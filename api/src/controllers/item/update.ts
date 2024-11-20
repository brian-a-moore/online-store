import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { UpdateItemBody, UpdateItemParams, UpdateItemQuery } from '../../types/routes';

export const updateItemController = async (
  req: Request<UpdateItemParams, unknown, UpdateItemBody, UpdateItemQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'updateItem' });
};
