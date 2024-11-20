import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { CreateProductBody, CreateProductParams, CreateProductQuery } from '../../types/routes';

export const createProductController = async (
  req: Request<CreateProductParams, unknown, CreateProductBody, CreateProductQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'createProduct' });
};
