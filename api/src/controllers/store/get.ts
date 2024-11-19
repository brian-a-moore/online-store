import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';

export const getStorePublic = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getStorePublic' });
};

export const getStorePrivate = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getStorePrivate' });
};
