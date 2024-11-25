import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  CreateStoreAdminBody,
  CreateStoreAdminParams,
  CreateStoreAdminQuery,
  DeleteStoreAdminBody,
  DeleteStoreAdminParams,
  DeleteStoreAdminQuery,
  ErrorResponse,
  GetStoreAdminBody,
  GetStoreAdminParams,
  GetStoreAdminQuery,
  ListStoresAdminBody,
  ListStoresAdminParams,
  ListStoresAdminQuery,
  UpdateStoreAdminBody,
  UpdateStoreAdminParams,
  UpdateStoreAdminQuery,
} from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const createStoreAdminController = async (
  req: Request<CreateStoreAdminParams, unknown, CreateStoreAdminBody, CreateStoreAdminQuery>,
  res: Response<any | ErrorResponse>,
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

export const listStoresAdminController = async (
  req: Request<ListStoresAdminParams, unknown, ListStoresAdminBody, ListStoresAdminQuery>,
  res: Response<any | ErrorResponse>,
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
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ stores });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getStoreAdminController = async (
  req: Request<GetStoreAdminParams, unknown, GetStoreAdminBody, GetStoreAdminQuery>,
  res: Response<any | ErrorResponse>,
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

export const updateStoreAdminController = async (
  req: Request<UpdateStoreAdminParams, unknown, UpdateStoreAdminBody, UpdateStoreAdminQuery>,
  res: Response<any | ErrorResponse>,
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

export const deleteStoreAdminController = async (
  req: Request<DeleteStoreAdminParams, unknown, DeleteStoreAdminBody, DeleteStoreAdminQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { storeId } = req.params;

    await db.store.delete({ where: { id: storeId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
