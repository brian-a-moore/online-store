import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { DeleteItemBody, DeleteItemParams, DeleteItemQuery } from '../../types/routes';

export const deleteItemController = async (
  req: Request<DeleteItemParams, unknown, DeleteItemBody, DeleteItemQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.params;

    await db.item.delete({ where: { id: itemId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
