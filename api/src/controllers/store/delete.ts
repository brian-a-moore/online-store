import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { DeleteStoreBody, DeleteStoreParams, DeleteStoreQuery } from '../../types/routes';

export const deleteStoreController = async (
  req: Request<DeleteStoreParams, unknown, DeleteStoreBody, DeleteStoreQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'deleteStore' });
};
