import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { CreateItemBody, CreateItemParams, CreateItemQuery } from '../../types/routes';

export const createItemController = async (
  req: Request<CreateItemParams, unknown, CreateItemBody, CreateItemQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const incomingItem = req.body;

    const id = crypto.randomUUID();

    await db.item.create({
      data: {
        ...incomingItem,
        id,
        productId,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ id });
  } catch (e: any | unknown) {
    next(e);
  }
};
