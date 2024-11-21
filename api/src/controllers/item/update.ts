import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { UpdateItemBody, UpdateItemParams, UpdateItemQuery, UpdateItemResponse } from '../../types/api';

export const updateItemController = async (
  req: Request<UpdateItemParams, unknown, UpdateItemBody, UpdateItemQuery>,
  res: Response<UpdateItemResponse>,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.params;
    const updatedItemFields = req.body;

    await db.item.update({ data: updatedItemFields, where: { id: itemId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
