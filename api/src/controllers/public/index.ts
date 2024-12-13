import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  ErrorResponse,
  GetProductPublicBody,
  GetProductPublicParams,
  GetProductPublicQuery,
  GetProductPublicResponse,
  GetStorePublicBody,
  GetStorePublicParams,
  GetStorePublicQuery,
  GetStorePublicResponse,
  ListItemsPublicBody,
  ListItemsPublicParams,
  ListItemsPublicQuery,
  ListItemsPublicResponse,
  ListProductsPublicBody,
  ListProductsPublicParams,
  ListProductsPublicQuery,
  ListProductsPublicResponse,
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
        image: true,
        description: true,
        updatedAt: true,
      },
      where: {
        isPublished: true,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      orderBy: {
        name: 'asc',
      },
    });

    res.status(STATUS_CODE.OKAY).json({ stores });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getStorePublicController = async (
  req: Request<GetStorePublicParams, unknown, GetStorePublicBody, GetStorePublicQuery>,
  res: Response<GetStorePublicResponse | ErrorResponse>,
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
        website: true,
      },
      where: { id: storeId, isPublished: true },
    });

    res.status(STATUS_CODE.OKAY).json({ store });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const listProductsPublicController = async (
  req: Request<ListProductsPublicParams, unknown, ListProductsPublicBody, ListProductsPublicQuery>,
  res: Response<ListProductsPublicResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { storeId } = req.query;
    let page;

    try {
      page = getPageNumber(req.query.page);
    } catch (e: any | unknown) {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: e.message });
      return;
    }

    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
      },
      where: {
        storeId,
        isPublished: true,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      orderBy: {
        name: 'asc',
      },
    });

    res.status(STATUS_CODE.OKAY).json({ products });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getProductPublicController = async (
  req: Request<GetProductPublicParams, unknown, GetProductPublicBody, GetProductPublicQuery>,
  res: Response<GetProductPublicResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    const product = await db.product.findUniqueOrThrow({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
      },
      where: { id: productId, isPublished: true },
    });

    res.status(STATUS_CODE.OKAY).json({ product });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const listItemsPublicController = async (
  req: Request<ListItemsPublicParams, unknown, ListItemsPublicBody, ListItemsPublicQuery>,
  res: Response<ListItemsPublicResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.query;
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
        itemTypeId: true,
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
        productId,
        isPublished: true,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      orderBy: {
        name: 'asc',
      },
    });

    res.status(STATUS_CODE.OKAY).json({ items });
  } catch (e: any | unknown) {
    next(e);
  }
};
