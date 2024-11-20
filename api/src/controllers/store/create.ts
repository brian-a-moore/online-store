import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { CreateStoreBody, CreateStoreParams, CreateStoreQuery } from '../../types/routes';

export const createStoreController = async (
  req: Request<CreateStoreParams, unknown, CreateStoreBody, CreateStoreQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'createStore' });
};
