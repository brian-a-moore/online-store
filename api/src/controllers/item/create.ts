import { STATUS_CODE } from '@sunami/constants';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { CreateItemBody, CreateItemParams, CreateItemQuery, CreateItemResponse } from '../../types/routes';

export const createItemController = async (
  req: Request<CreateItemParams, unknown, CreateItemBody, CreateItemQuery>,
  res: Response<CreateItemResponse>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const { config, ...incomingItem } = req.body;

    const id = crypto.randomUUID();

    await db.item.create({
      data: {
        ...incomingItem,
        id,
        productId,
        config: JSON.stringify(config),
        isPublished: false,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ id });
  } catch (e: any | unknown) {
    next(e);
  }
};
