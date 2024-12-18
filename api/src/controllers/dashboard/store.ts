import { Prisma } from '@prisma/client';
import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  ErrorResponse,
  GetStoreDashboardBody,
  GetStoreDashboardParams,
  GetStoreDashboardQuery,
  GetStoreDashboardResponse,
  GetStoreLoggedInUserRelationDashboardBody,
  GetStoreLoggedInUserRelationDashboardParams,
  GetStoreLoggedInUserRelationDashboardQuery,
  GetStoreLoggeDInUserRelationDashboardResponse,
  GetStoreTeamDashboardBody,
  GetStoreTeamDashboardParams,
  GetStoreTeamDashboardQuery,
  GetStoreTeamDashboardResponse,
  ListStoresDashboardBody,
  ListStoresDashboardParams,
  ListStoresDashboardQuery,
  ListStoresDashboardResponse,
  UpdateStoreDashboardBody,
  UpdateStoreDashboardParams,
  UpdateStoreDashboardQuery,
  UpdateStoreDashboardResponse,
} from '../../types/api';
import { getPageNumber } from '../../utils/queryParsing';

export const listStoresDashboardController = async (
  req: Request<
    ListStoresDashboardParams,
    unknown,
    ListStoresDashboardBody,
    ListStoresDashboardQuery
  >,
  res: Response<ListStoresDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    let page;
    const { search, statusFilter } = req.query;

    try {
      page = getPageNumber(req.query.page);
    } catch (e: any | unknown) {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: e.message });
      return;
    }

    const where: Prisma.StoreWhereInput = {
      userStores: {
        some: {
          userId: req.user!.id,
        },
      },
    };

    if (search && search.length > 0) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    if (statusFilter === 'public') {
      where.isPublished = true;
    } else if (statusFilter === 'unlisted') {
      where.isPublished = false;
    }

    const stores = await db.store.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        updatedAt: true,
        isPublished: true,
      },
      where,
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ stores });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getStoreLoggedInUserRelationDashboardController = async (
  req: Request<
    GetStoreLoggedInUserRelationDashboardParams,
    unknown,
    GetStoreLoggedInUserRelationDashboardBody,
    GetStoreLoggedInUserRelationDashboardQuery
  >,
  res: Response<GetStoreLoggeDInUserRelationDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  const { id } = req.user!;

  try {
    const relation = await db.userStoreRelation.findFirstOrThrow({
      select: {
        id: true,
        roleId: true,
      },
      where: {
        userId: id,
        storeId: req.params.storeId,
      },
    });

    res
      .status(STATUS_CODE.OKAY)
      .json({ relation: { relationId: relation.id, roleId: relation.roleId } });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getStoreTeamDashboardController = async (
  req: Request<
    GetStoreTeamDashboardParams,
    unknown,
    GetStoreTeamDashboardBody,
    GetStoreTeamDashboardQuery
  >,
  res: Response<GetStoreTeamDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    let page, storeId;
    const { search, searchKey, roleFilter } = req.query;

    try {
      page = getPageNumber(req.query.page);
      storeId = req.params.storeId;
    } catch (e: any | unknown) {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: e.message });
      return;
    }

    const where: Prisma.UserStoreRelationWhereInput = {
      storeId,
    };

    if (search && search.length > 0) {
      const user = { [searchKey]: { contains: search, mode: 'insensitive' } };
      where.user = user;
    }

    if (roleFilter === 'manager') {
      where.roleId = 1;
    }

    if (roleFilter === 'editor') {
      where.roleId = 2;
    }

    const rawTeam = await db.userStoreRelation.findMany({
      select: {
        id: true,
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
      where,
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });
    const team = rawTeam.map(({ id, roleId, storeId, user }) => ({
      relationId: id,
      userId: user.id,
      storeId,
      roleId,
      name: user.name,
      email: user.email,
    }));
    res.status(STATUS_CODE.OKAY).json({ team });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getStoreDashboardController = async (
  req: Request<
    GetStoreDashboardParams,
    unknown,
    GetStoreDashboardBody,
    GetStoreDashboardQuery
  >,
  res: Response<GetStoreDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  const { storeId } = req.params;

  try {
    const store = await db.store.findUniqueOrThrow({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: storeId },
    });

    res.status(STATUS_CODE.OKAY).json({ store });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const updateStoreDashboardController = async (
  req: Request<
    UpdateStoreDashboardParams,
    unknown,
    UpdateStoreDashboardBody,
    UpdateStoreDashboardQuery
  >,
  res: Response<UpdateStoreDashboardResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { storeId } = req.params;
    const updatedStoreFields = req.body;

    await db.store.update({ data: updatedStoreFields, where: { id: storeId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
