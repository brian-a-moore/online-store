import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { GetBreadcrumbBody, GetBreadcrumbParams, GetBreadcrumbQuery, GetBreadcrumbResponse } from '../../types/api';

export const getBreadcrumbController = async (
  req: Request<GetBreadcrumbParams, unknown, GetBreadcrumbBody, GetBreadcrumbQuery>,
  res: Response<GetBreadcrumbResponse>,
  next: NextFunction,
) => {
  const ids = req.query;

  try {
    const store = await db.store.findUniqueOrThrow({ select: { name: true }, where: { id: ids.storeId } });

    const crumbs = [{ name: store.name, id: ids.storeId }];
    if (ids.productId) {
      const product = await db.product.findUniqueOrThrow({ select: { name: true }, where: { id: ids.productId } });
      crumbs.push({ name: product.name, id: ids.productId });
    }

    if (ids.itemId) {
      const item = await db.item.findUniqueOrThrow({ select: { name: true }, where: { id: ids.itemId } });
      crumbs.push({ name: item.name, id: ids.itemId });
    }

    res.status(STATUS_CODE.OKAY).json({ crumbs });
  } catch (e: any | unknown) {
    next(e);
  }
};
