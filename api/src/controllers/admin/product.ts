import { Prisma } from '@prisma/client';
import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  DeleteProductAdminBody,
  DeleteProductAdminParams,
  DeleteProductAdminQuery,
  DeleteProductAdminResponse,
  ErrorResponse,
  GetProductAdminBody,
  GetProductAdminParams,
  GetProductAdminQuery,
  GetProductAdminResponse,
  ListProductsAdminBody,
  ListProductsAdminParams,
  ListProductsAdminQuery,
  ListProductsAdminResponse,
  UpdateProductAdminBody,
  UpdateProductAdminParams,
  UpdateProductAdminQuery,
  UpdateProductAdminResponse,
} from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const listProductsAdminController = async (
  req: Request<
    ListProductsAdminParams,
    unknown,
    ListProductsAdminBody,
    ListProductsAdminQuery
  >,
  res: Response<ListProductsAdminResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    let page;
    const { search, searchKey, statusFilter } = req.query;

    try {
      page = getPageNumber(req.query.page);
    } catch (e: any | unknown) {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: e.message });
      return;
    }

    let where: Prisma.ProductWhereInput = {};

    if (search && search.length > 0) {
      if (searchKey === 'name') {
        where.name = { contains: search, mode: 'insensitive' };
      } else {
        where = {
          ...where,
          store: { name: { contains: search, mode: 'insensitive' } },
        };
      }
    }

    if (statusFilter === 'public') {
      where.isPublished = true;
    } else if (statusFilter === 'unlisted') {
      where.isPublished = false;
    }

    const rawProducts = await db.product.findMany({
      select: {
        id: true,
        storeId: true,
        name: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
        store: {
          select: {
            name: true,
          },
        },
      },
      where,
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      orderBy: [
        {
          store: {
            name: 'asc',
          },
        },
        {
          name: 'asc',
        },
      ],
    });

    const products = rawProducts.map((product) => ({
      id: product.id,
      storeId: product.storeId,
      name: product.name,
      storeName: product.store.name,
      isPublished: product.isPublished ? 'Public' : 'Unlisted',
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    res.status(STATUS_CODE.OKAY).json({ products });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getProductAdminController = async (
  req: Request<
    GetProductAdminParams,
    unknown,
    GetProductAdminBody,
    GetProductAdminQuery
  >,
  res: Response<GetProductAdminResponse | ErrorResponse>,
  next: NextFunction,
) => {
  const { productId } = req.params;

  try {
    const product = await db.product.findUniqueOrThrow({
      where: { id: productId },
    });

    res.status(STATUS_CODE.OKAY).json({ product });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const updateProductAdminController = async (
  req: Request<
    UpdateProductAdminParams,
    unknown,
    UpdateProductAdminBody,
    UpdateProductAdminQuery
  >,
  res: Response<UpdateProductAdminResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const updatedProductFields = req.body;

    await db.product.update({
      data: updatedProductFields,
      where: { id: productId },
    });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};

export const deleteProductAdminController = async (
  req: Request<
    DeleteProductAdminParams,
    unknown,
    DeleteProductAdminBody,
    DeleteProductAdminQuery
  >,
  res: Response<DeleteProductAdminResponse | ErrorResponse>,
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
