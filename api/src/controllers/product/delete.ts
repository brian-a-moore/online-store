import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { DeleteProductBody, DeleteProductParams, DeleteProductQuery, DeleteProductResponse } from '../../types/routes';

export const deleteProductController = async (
  req: Request<DeleteProductParams, unknown, DeleteProductBody, DeleteProductQuery>,
  res: Response<DeleteProductResponse>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    await db.product.delete({ where: { id: productId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
