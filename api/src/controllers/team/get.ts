import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import { ErrorResponse, GetTeamBody, GetTeamParams, GetTeamQuery, GetTeamResponse } from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const getTeamController = async (
  req: Request<GetTeamParams, unknown, GetTeamBody, GetTeamQuery>,
  res: Response<GetTeamResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    let page, storeId;

    try {
      page = getPageNumber(req.query.page);
      storeId = req.params.storeId;
    } catch (e: any | unknown) {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: e.message });
      return;
    }

    const rawTeam = await db.userStore.findMany({
      select: {
        userId: true,
        storeId: true,
        roleId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      where: {
        storeId,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    const team = rawTeam.map((member) => ({
      id: member.user.id,
      name: member.user.name,
      email: member.user.email,
      store: {
        storeId: member.storeId,
        roleId: member.roleId,
      },
    }));

    res.status(STATUS_CODE.OKAY).json({ team });
  } catch (e: any | unknown) {
    next(e);
  }
};
