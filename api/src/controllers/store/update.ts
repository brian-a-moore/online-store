import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { UpdateStoreBody, UpdateStoreParams, UpdateStoreQuery } from '../../types/routes';

export const updateStoreController = async (
  req: Request<UpdateStoreParams, unknown, UpdateStoreBody, UpdateStoreQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'updateStore' });
};
