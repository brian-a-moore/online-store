import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import { DeleteProductBody, DeleteProductParams, DeleteProductQuery } from '../../types/routes';

export const deleteProductController = async (
  req: Request<DeleteProductParams, unknown, DeleteProductBody, DeleteProductQuery>,
  res: Response,
) => {
  res.status(STATUS_CODE.NOT_IMPLEMENTED).json({ message: 'deleteProduct' });
};
