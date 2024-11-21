import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { UpdateProductBody, UpdateProductParams, UpdateProductQuery, UpdateProductResponse } from '../../types/api';

export const updateProductController = async (
  req: Request<UpdateProductParams, unknown, UpdateProductBody, UpdateProductQuery>,
  res: Response<UpdateProductResponse>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const updatedProductFields = req.body;

    await db.product.update({ data: updatedProductFields, where: { id: productId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
