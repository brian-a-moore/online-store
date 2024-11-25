import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  CreateProductDashboardBody,
  CreateProductDashboardParams,
  CreateProductDashboardQuery,
  CreateProductDashboardResponse,
  DeleteProductDashboardBody,
  DeleteProductDashboardParams,
  DeleteProductDashboardQuery,
  DeleteProductDashboardResponse,
  ErrorResponse,
  GetProductDashboardBody,
  GetProductDashboardParams,
  GetProductDashboardQuery,
  GetProductDashboardResponse,
  ListProductsDashboardBody,
  ListProductsDashboardParams,
  ListProductsDashboardQuery,
  ListProductsDashboardResponse,
  UpdateProductDashboardBody,
  UpdateProductDashboardParams,
  UpdateProductDashboardQuery,
  UpdateProductDashboardResponse,
} from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const createProductDashboardController = async (
  req: Request<CreateProductDashboardParams, unknown, CreateProductDashboardBody, CreateProductDashboardQuery>,
  res: Response<CreateProductDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { storeId } = req.query;
    const incomingProduct = req.body;

    const id = crypto.randomUUID();

    await db.product.create({
      data: {
        ...incomingProduct,
        id,
        storeId,
        isPublished: false,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ id });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const listProductsDashboardController = async (
  req: Request<ListProductsDashboardParams, unknown, ListProductsDashboardBody, ListProductsDashboardQuery>,
  res: Response<ListProductsDashboardResponse | ErrorResponse>,
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
      where: {
        storeId: req.query.storeId,
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

export const getProductDashboardController = async (
  req: Request<GetProductDashboardParams, unknown, GetProductDashboardBody, GetProductDashboardQuery>,
  res: Response<GetProductDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  const { productId } = req.params;

  try {
    const product = await db.product.findUniqueOrThrow({ where: { id: productId } });

    res.status(STATUS_CODE.OKAY).json({ product });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const updateProductDashboardController = async (
  req: Request<UpdateProductDashboardParams, unknown, UpdateProductDashboardBody, UpdateProductDashboardQuery>,
  res: Response<UpdateProductDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const updatedProductFields = req.body;

    await db.product.update({ data: updatedProductFields, where: { id: productId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};

export const deleteProductDashboardController = async (
  req: Request<DeleteProductDashboardParams, unknown, DeleteProductDashboardBody, DeleteProductDashboardQuery>,
  res: Response<DeleteProductDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    await db.product.delete({ where: { id: productId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
