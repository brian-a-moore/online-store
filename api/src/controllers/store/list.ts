import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';

export const listStoresPublicController = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listStoresPublic' });
};

export const listStoresPrivateController = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listStoresPrivate' });
};
