import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';

export const listItemsPublicController = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listItemsPublic' });
};

export const listItemsPrivateController = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'listItemsPrivate' });
};
