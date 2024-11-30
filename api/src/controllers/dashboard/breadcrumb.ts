import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import {
  ErrorResponse,
  GetBreadcrumbDashboardBody,
  GetBreadcrumbDashboardParams,
  GetBreadcrumbDashboardQuery,
  GetBreadcrumbDashboardResponse,
} from '../../types/api';

export const getBreadcrumbDashboardController = async (
  req: Request<GetBreadcrumbDashboardParams, unknown, GetBreadcrumbDashboardBody, GetBreadcrumbDashboardQuery>,
  res: Response<GetBreadcrumbDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  const ids = req.query;

  try {
    const crumbs: { name: string; id: string }[] = [];

    if (ids.storeId) {
      const store = await db.store.findUniqueOrThrow({ select: { id: true, name: true }, where: { id: ids.storeId } });
      crumbs.push({ name: store.name, id: store.id });
    }

    if (ids.productId) {
      const product = await db.product.findUniqueOrThrow({
        select: { id: true, name: true },
        where: { id: ids.productId },
      });
      crumbs.push({ name: product.name, id: product.id });
    }

    if (ids.itemId) {
      const item = await db.item.findUniqueOrThrow({
        select: { id: true, name: true },
        where: { id: ids.itemId },
      });
      crumbs.push({ name: item.name, id: item.id });
    }

    res.status(STATUS_CODE.OKAY).json({ crumbs });
  } catch (e: any | unknown) {
    next(e);
  }
};
