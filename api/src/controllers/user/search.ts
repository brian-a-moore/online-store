import { Prisma } from '@prisma/client';
import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { SearchUsersBody, SearchUsersParams, SearchUsersQuery, SearchUsersResponse } from '../../types/api';

export const searchUsersController = async (
  req: Request<SearchUsersParams, unknown, SearchUsersBody, SearchUsersQuery>,
  res: Response<SearchUsersResponse>,
  next: NextFunction,
) => {
  const { search, field } = req.query;

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
    });

    res.status(STATUS_CODE.OKAY).json({ users });
  } catch (e: any | unknown) {
    next(e);
  }
};
