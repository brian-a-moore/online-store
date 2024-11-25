import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  ErrorResponse,
  GetStoreDashboardBody,
  GetStoreDashboardParams,
  GetStoreDashboardQuery,
  GetStoreDashboardResponse,
  ListStoresDashboardBody,
  ListStoresDashboardParams,
  ListStoresDashboardQuery,
  ListStoresDashboardResponse,
  UpdateStoreDashboardBody,
  UpdateStoreDashboardParams,
  UpdateStoreDashboardQuery,
  UpdateStoreDashboardResponse,
} from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const listStoresDashboardController = async (
  req: Request<ListStoresDashboardParams, unknown, ListStoresDashboardBody, ListStoresDashboardQuery>,
  res: Response<ListStoresDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    let page;

    try {
      page = getPageNumber(req.query.page);
    } catch (e: any | unknown) {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: e.message });
      return;
    }

    const stores = await db.store.findMany({
      select: {
        id: true,
        name: true,
        updatedAt: true,
        isPublished: true,
      },
      where: {
        userStores: {
          some: {
            userId: req.user!.id,
          },
        },
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ stores });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getStoreDashboardController = async (
  req: Request<GetStoreDashboardParams, unknown, GetStoreDashboardBody, GetStoreDashboardQuery>,
  res: Response<GetStoreDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  const { storeId } = req.params;

  try {
    const store = await db.store.findUniqueOrThrow({
      select: {
        id: true,
        name: true,
        image: true,
        bannerImage: true,
        website: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: storeId },
    });

    res.status(STATUS_CODE.OKAY).json({ store });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const updateStoreDashboardController = async (
  req: Request<UpdateStoreDashboardParams, unknown, UpdateStoreDashboardBody, UpdateStoreDashboardQuery>,
  res: Response<UpdateStoreDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { storeId } = req.params;
    const updatedStoreFields = req.body;

    await db.store.update({ data: updatedStoreFields, where: { id: storeId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
