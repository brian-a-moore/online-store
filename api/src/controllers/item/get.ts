import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { GetItemBody, GetItemParams, GetItemQuery, GetItemResponse } from '../../types/api';

export const getItemController = async (
  req: Request<GetItemParams, unknown, GetItemBody, GetItemQuery>,
  res: Response<GetItemResponse>,
  next: NextFunction,
) => {
  const { itemId } = req.params;

  try {
    const item = await db.item.findUniqueOrThrow({
      where: { id: itemId },
    });

    res.status(STATUS_CODE.OKAY).json({ item });
  } catch (e: any | unknown) {
    next(e);
  }
};
