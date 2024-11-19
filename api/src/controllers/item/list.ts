import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';

export const listItemsPublic = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listItemsPublic' });
};

export const listItemsPrivate = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listItemsPrivate' });
};
