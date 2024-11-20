import { STATUS_CODE } from '@sunami/constants';
import { Request, Response } from 'express';
import db from '../../config/db';
import { PAGE_LIMIT } from '../../constants';
import { ListUsersBody, ListUsersParams, ListUsersQuery } from '../../types/routes';

export const listUsersController = async (
  req: Request<ListUsersParams, unknown, ListUsersBody, ListUsersQuery>,
  res: Response,
) => {
  const { page = 1, roles, storeId } = req.query;
  const offset = (Number(page) - 1) * PAGE_LIMIT;

  const where: any = {
    AND: [],
  };

  if (storeId) {
    where.AND.push({ storeId });
  }

  if (roles) {
    where.AND.push({
      stores: {
        some: {
          roleId: {
            in: roles,
          },
        },
      },
    });
  }

  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      stores: {
        select: {
          roleId: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    where,
    skip: offset,
    take: PAGE_LIMIT,
  });

  res.status(STATUS_CODE.OKAY).json({ users });
};
