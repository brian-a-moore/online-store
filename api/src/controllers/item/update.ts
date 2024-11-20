import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { UpdateItemBody, UpdateItemParams, UpdateItemQuery } from '../../types/routes';

export const updateItemController = async (
  req: Request<UpdateItemParams, unknown, UpdateItemBody, UpdateItemQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.params;
    const updatedItemFields = req.body;

    await db.item.update({ data: updatedItemFields, where: { id: itemId } });

    res.status(STATUS_CODE.NO_CONTENT).json();
  } catch (e: any | unknown) {
    next(e);
  }
};
