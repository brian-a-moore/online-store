import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { UpdateProductBody, UpdateProductParams, UpdateProductQuery } from '../../types/routes';

export const updateProductController = async (
  req: Request<UpdateProductParams, unknown, UpdateProductBody, UpdateProductQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'updateProduct' });
};
