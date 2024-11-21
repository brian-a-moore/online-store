import { STATUS_CODE } from '@sunami/constants';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { CreateStoreBody, CreateStoreParams, CreateStoreQuery, CreateStoreResponse } from '../../types/routes';

export const createStoreController = async (
  req: Request<CreateStoreParams, unknown, CreateStoreBody, CreateStoreQuery>,
  res: Response<CreateStoreResponse>,
  next: NextFunction,
) => {
  try {
    const incomingStore = req.body;

    const id = crypto.randomUUID();

    await db.store.create({
      data: {
        ...incomingStore,
        id,
        isPublished: false,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ id });
  } catch (e: any | unknown) {
    next(e);
  }
};
