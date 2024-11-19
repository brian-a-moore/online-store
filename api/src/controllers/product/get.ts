import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';

export const getProductPublic = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getProductPublic' });
};

export const getProductPrivate = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getProductPrivate' });
};
