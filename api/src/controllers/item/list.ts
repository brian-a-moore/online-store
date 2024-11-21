import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  ListItemsPrivateBody,
  ListItemsPrivateParams,
  ListItemsPrivateQuery,
  ListItemsPrivateResponse,
  ListItemsPublicBody,
  ListItemsPublicParams,
  ListItemsPublicQuery,
  ListItemsPublicResponse,
} from '../../types/routes';
import { getPageNumber } from '../../utils/queryParsing';

export const listItemsPublicController = async (
  req: Request<ListItemsPublicParams, unknown, ListItemsPublicBody, ListItemsPublicQuery>,
  res: Response<ListItemsPublicResponse>,
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

    const items = await db.item.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        config: true,
        maxQuantityPerOrder: true,
        product: {
          select: {
            name: true,
          },
        },
      },
      where: {
        isPublished: true,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ items });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const listItemsPrivateController = async (
  req: Request<ListItemsPrivateParams, unknown, ListItemsPrivateBody, ListItemsPrivateQuery>,
  res: Response<ListItemsPrivateResponse>,
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

    const items = await db.item.findMany({
      select: {
        id: true,
        name: true,
        updatedAt: true,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ items });
  } catch (e: any | unknown) {
    next(e);
  }
};
