import { STATUS_CODE } from '@sunami/constants';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  CreateItemDashboardBody,
  CreateItemDashboardParams,
  CreateItemDashboardQuery,
  CreateItemDashboardResponse,
  DeleteItemDashboardBody,
  DeleteItemDashboardParams,
  DeleteItemDashboardQuery,
  DeleteItemDashboardResponse,
  ErrorResponse,
  GetItemDashboardBody,
  GetItemDashboardParams,
  GetItemDashboardQuery,
  GetItemDashboardResponse,
  ListItemsDashboardBody,
  ListItemsDashboardParams,
  ListItemsDashboardQuery,
  ListItemsDashboardResponse,
  UpdateItemDashboardBody,
  UpdateItemDashboardParams,
  UpdateItemDashboardQuery,
  UpdateItemDashboardResponse,
} from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const createItemDashboardController = async (
  req: Request<CreateItemDashboardParams, unknown, CreateItemDashboardBody, CreateItemDashboardQuery>,
  res: Response<CreateItemDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.query;
    const { config, ...incomingItem } = req.body;

    const id = crypto.randomUUID();

    const item = {
      ...incomingItem,
      productId,
      id,
      config: JSON.stringify(config),
    };
    await db.item.create({
      data: item,
    });

    res.status(STATUS_CODE.OKAY).json({ id });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const listItemsDashboardController = async (
  req: Request<ListItemsDashboardParams, unknown, ListItemsDashboardBody, ListItemsDashboardQuery>,
  res: Response<ListItemsDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    let page;
    const { productId } = req.query;

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
        image: true,
        updatedAt: true,
        isPublished: true,
      },
      where: {
        productId,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ items });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getItemDashboardController = async (
  req: Request<GetItemDashboardParams, unknown, GetItemDashboardBody, GetItemDashboardQuery>,
  res: Response<GetItemDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  const { itemId } = req.params;

  try {
    const item = await db.item.findUniqueOrThrow({
      where: { id: itemId },
    });

    res.status(STATUS_CODE.OKAY).json({ item });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const updateItemDashboardController = async (
  req: Request<UpdateItemDashboardParams, unknown, UpdateItemDashboardBody, UpdateItemDashboardQuery>,
  res: Response<UpdateItemDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.params;
    const { config, ...rest } = req.body;

    const updatedItem = {
      ...rest,
      ...(config && { config: JSON.stringify(config) }),
    };

    await db.item.update({ data: updatedItem, where: { id: itemId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};

export const deleteItemDashboardController = async (
  req: Request<DeleteItemDashboardParams, unknown, DeleteItemDashboardBody, DeleteItemDashboardQuery>,
  res: Response<DeleteItemDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.params;

    await db.item.delete({ where: { id: itemId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
