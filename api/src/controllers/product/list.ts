import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  ErrorResponse,
  ListProductsPrivateBody,
  ListProductsPrivateParams,
  ListProductsPrivateQuery,
  ListProductsPrivateResponse,
  ListProductsPublicBody,
  ListProductsPublicParams,
  ListProductsPublicQuery,
  ListProductsPublicResponse,
} from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const listProductsPublicController = async (
  req: Request<ListProductsPublicParams, unknown, ListProductsPublicBody, ListProductsPublicQuery>,
  res: Response<ListProductsPublicResponse | ErrorResponse>,
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

    const products = await db.product.findMany({
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

    res.status(STATUS_CODE.OKAY).json({ products });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const listProductsPrivateController = async (
  req: Request<ListProductsPrivateParams, unknown, ListProductsPrivateBody, ListProductsPrivateQuery>,
  res: Response<ListProductsPrivateResponse | ErrorResponse>,
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

    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        updatedAt: true,
        isPublished: true,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ products });
  } catch (e: any | unknown) {
    next(e);
  }
};
