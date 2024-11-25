import { Prisma } from '@prisma/client';
import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  ErrorResponse,
  SearchUsersDashboardBody,
  SearchUsersDashboardParams,
  SearchUsersDashboardQuery,
} from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const searchUsersDashboardController = async (
  req: Request<SearchUsersDashboardParams, unknown, SearchUsersDashboardBody, SearchUsersDashboardQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  const { search, field } = req.body;
  const page = getPageNumber(req.query.page);

  const where: Prisma.UserWhereInput = {};

  if (field === 'email') {
    where.email = {
      contains: search,
      mode: 'insensitive',
    };
  }

  if (field === 'name') {
    where.name = {
      contains: search,
      mode: 'insensitive',
    };
  }

  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where,
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      orderBy: {
        name: 'asc',
      },
    });

    res.status(STATUS_CODE.OKAY).json({ users });
  } catch (e: any | unknown) {
    next(e);
  }
};
