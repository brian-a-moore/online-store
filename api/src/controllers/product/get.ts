import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';

export const getProductPublicController = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getProductPublic' });
};

export const getProductPrivateController = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getProductPrivate' });
};
