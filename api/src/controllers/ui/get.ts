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
    const crumbs: { name: string; id: string }[] = [];

    if (ids.productId) {
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

    res.status(STATUS_CODE.OKAY).json({ crumbs });
  } catch (e: any | unknown) {
    next(e);
  }
};
