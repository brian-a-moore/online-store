import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import {
  AddStoreRelationDashboardBody,
  AddStoreRelationDashboardParams,
  AddStoreRelationDashboardQuery,
  DeleteStoreRelationDashboardBody,
  DeleteStoreRelationDashboardParams,
  DeleteStoreRelationDashboardQuery,
  ErrorResponse,
  UpdateStoreRelationDashboardBody,
  UpdateStoreRelationDashboardParams,
  UpdateStoreRelationDashboardQuery,
} from '../../types/api';

export const addStoreRelationDashboardController = async (
  req: Request<AddStoreRelationDashboardParams, unknown, AddStoreRelationDashboardBody, AddStoreRelationDashboardQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  const userId = req.user!.id;
  try {
    const incomingRelation = req.body;

    const id = crypto.randomUUID();

    await db.userStoreRelation.create({
      data: {
        ...incomingRelation,
        userId,
        id,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ id });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const updateStoreRelationDashboardController = async (
  req: Request<
    UpdateStoreRelationDashboardParams,
    unknown,
    UpdateStoreRelationDashboardBody,
    UpdateStoreRelationDashboardQuery
  >,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { relationId } = req.params;
    const updatedRelation = req.body;

    await db.userStoreRelation.update({ data: updatedRelation, where: { id: relationId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};

export const deleteStoreRelationDashboardController = async (
  req: Request<
    DeleteStoreRelationDashboardParams,
    unknown,
    DeleteStoreRelationDashboardBody,
    DeleteStoreRelationDashboardQuery
  >,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { relationid } = req.params;

    await db.userStoreRelation.delete({ where: { id: relationid } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
