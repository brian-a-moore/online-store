import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import {
  GetProductPrivateBody,
  GetProductPrivateParams,
  GetProductPrivateQuery,
  GetProductPrivateResponse,
  GetProductPublicBody,
  GetProductPublicParams,
  GetProductPublicQuery,
  GetProductPublicResponse,
} from '../../types/routes';

export const getProductPublicController = async (
  req: Request<GetProductPublicParams, unknown, GetProductPublicBody, GetProductPublicQuery>,
  res: Response<GetProductPublicResponse>,
  next: NextFunction,
) => {
  const { productId } = req.params;

  try {
    const product = await db.product.findUniqueOrThrow({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
      },
      where: { id: productId, isPublished: true },
    });

    res.status(STATUS_CODE.OKAY).json({ product });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getProductPrivateController = async (
  req: Request<GetProductPrivateParams, unknown, GetProductPrivateBody, GetProductPrivateQuery>,
  res: Response<GetProductPrivateResponse>,
  next: NextFunction,
) => {
  const { productId } = req.params;

  try {
    const product = await db.product.findUniqueOrThrow({ where: { id: productId } });

    res.status(STATUS_CODE.OKAY).json({ product });
  } catch (e: any | unknown) {
    next(e);
  }
};
