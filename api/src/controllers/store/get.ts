import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import {
  GetStorePrivateBody,
  GetStorePrivateParams,
  GetStorePrivateQuery,
  GetStorePublicBody,
  GetStorePublicParams,
  GetStorePublicQuery,
} from '../../types/routes';

export const getStorePublicController = async (
  req: Request<GetStorePublicParams, unknown, GetStorePublicBody, GetStorePublicQuery>,
  res: Response,
  next: NextFunction,
) => {
  const { storeId } = req.params;

  try {
    const store = await db.store.findUniqueOrThrow({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        heroImage: true,
        website: true,
      },
      where: { id: storeId },
    });

    res.status(STATUS_CODE.OKAY).json({ store });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getStorePrivateController = async (
  req: Request<GetStorePrivateParams, unknown, GetStorePrivateBody, GetStorePrivateQuery>,
  res: Response,
  next: NextFunction,
) => {
  const { storeId } = req.params;

  try {
    const store = await db.store.findUniqueOrThrow({ where: { id: storeId } });

    res.status(STATUS_CODE.OKAY).json({ store });
  } catch (e: any | unknown) {
    next(e);
  }
};
