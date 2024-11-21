import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { GetUserBody, GetUserParams, GetUserQuery, GetUserResponse } from '../../types/routes';

export const getUserController = async (
  req: Request<GetUserParams, unknown, GetUserBody, GetUserQuery>,
  res: Response<GetUserResponse>,
  next: NextFunction,
) => {
  const { userId } = req.params;

  try {
    const user = await db.user.findUniqueOrThrow({
      select: {
        id: true,
        email: true,
        name: true,
        isSuperUser: true,
        createdAt: true,
        updatedAt: true,
        stores: {
          select: {
            storeId: true,
            roleId: true,
            store: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: { id: userId },
    });

    res.status(STATUS_CODE.OKAY).json({ user });
  } catch (e: any | unknown) {
    next(e);
  }
};
