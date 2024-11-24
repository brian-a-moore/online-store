import { Prisma } from '@prisma/client';
import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import { ErrorResponse, ListUsersBody, ListUsersParams, ListUsersQuery, ListUsersResponse } from '../../types/api';
import { getPageNumber, getRoleId } from '../../utils/queryParsing';

export const listUsersController = async (
  req: Request<ListUsersParams, unknown, ListUsersBody, ListUsersQuery>,
  res: Response<ListUsersResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    let page, storeId, roleId;

    try {
      page = getPageNumber(req.query.page);
      storeId = req.query.storeId;
      roleId = getRoleId(req.query.roleId);
    } catch (e: any | unknown) {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: e.message });
      return;
    }

    const where: Prisma.UserWhereInput = {};

    if (storeId) {
      where.stores = { some: { ...where.stores?.some, storeId } };
    }

    if (roleId) {
      where.stores = { some: { ...where.stores?.some, roleId } };
    }

    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        stores: {
          select: {
            storeId: true,
            roleId: true,
          },
        },
      },
      ...(Object.keys(where).length > 0 && { where }),
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ users });
  } catch (e: any | unknown) {
    next(e);
  }
};
