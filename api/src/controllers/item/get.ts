import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';

export const getItemPublic = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getItemPublic' });
};

export const getItemPrivate = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'getItemPrivate' });
};
