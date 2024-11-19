import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';

export const createProduct = async (req: Request, res: Response) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'createProduct' });
};
