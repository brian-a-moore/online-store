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
      storeId = req.query.storeId;
    } catch (e: any | unknown) {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: e.message });
      return;
    }

    const team = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
      where: {
        stores: {
          some: { storeId },
        },
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ team });
  } catch (e: any | unknown) {
    next(e);
  }
};
