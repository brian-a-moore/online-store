import { STATUS_CODE } from '@sunami/constants';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { CreateProductBody, CreateProductParams, CreateProductQuery } from '../../types/routes';

export const createProductController = async (
  req: Request<CreateProductParams, unknown, CreateProductBody, CreateProductQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { storeId } = req.params;
    const incomingProduct = req.body;

    const id = crypto.randomUUID();

    await db.product.create({
      data: {
        ...incomingProduct,
        id,
        storeId,
        isPublished: false,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ id });
  } catch (e: any | unknown) {
    next(e);
  }
};
