import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { DeleteItemBody, DeleteItemParams, DeleteItemQuery } from '../../types/routes';

export const deleteItemController = async (
  req: Request<DeleteItemParams, unknown, DeleteItemBody, DeleteItemQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'deleteItem' });
};
