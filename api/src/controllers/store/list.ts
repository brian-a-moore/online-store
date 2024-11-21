import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  ErrorResponse,
  ListStoresPrivateBody,
  ListStoresPrivateParams,
  ListStoresPrivateQuery,
  ListStoresPrivateResponse,
  ListStoresPublicBody,
  ListStoresPublicParams,
  ListStoresPublicQuery,
  ListStoresPublicResponse,
} from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const listStoresPublicController = async (
  req: Request<ListStoresPublicParams, unknown, ListStoresPublicBody, ListStoresPublicQuery>,
  res: Response<ListStoresPublicResponse | ErrorResponse>,
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
        description: true,
        image: true,
      },
      where: {
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

export const listStoresPrivateController = async (
  req: Request<ListStoresPrivateParams, unknown, ListStoresPrivateBody, ListStoresPrivateQuery>,
  res: Response<ListStoresPrivateResponse | ErrorResponse>,
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
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ stores });
  } catch (e: any | unknown) {
    next(e);
  }
};
