import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { UpdateStoreBody, UpdateStoreParams, UpdateStoreQuery } from '../../types/routes';

export const updateStoreController = async (
  req: Request<UpdateStoreParams, unknown, UpdateStoreBody, UpdateStoreQuery>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { storeId } = req.params;
    const updatedStoreFields = req.body;

    await db.store.update({ data: updatedStoreFields, where: { id: storeId } });

    res.status(STATUS_CODE.NO_CONTENT).json();
  } catch (e: any | unknown) {
    next(e);
  }
};
