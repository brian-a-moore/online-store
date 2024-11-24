import { STATUS_CODE } from '@sunami/constants';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { AddUserToStoreBody, AddUserToStoreParams, AddUserToStoreQuery, AddUserToStoreResponse } from '../../types/api';

export const addUserToStoreController = async (
  req: Request<AddUserToStoreParams, unknown, AddUserToStoreBody, AddUserToStoreQuery>,
  res: Response<AddUserToStoreResponse>,
  next: NextFunction,
) => {
  try {
    const { storeId } = req.params;
    const { userId, roleId } = req.body;

    const id = crypto.randomUUID();

    await db.userStore.create({
      data: {
        id,
        userId,
        storeId,
        roleId,
      },
    });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
