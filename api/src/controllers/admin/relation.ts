import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import {
  AddStoreRelationAdminBody,
  AddStoreRelationAdminParams,
  AddStoreRelationAdminQuery,
  AddStoreRelationAdminResponse,
  DeleteStoreRelationAdminBody,
  DeleteStoreRelationAdminParams,
  DeleteStoreRelationAdminQuery,
  DeleteStoreRelationAdminResponse,
  ErrorResponse,
  UpdateStoreRelationAdminBody,
  UpdateStoreRelationAdminParams,
  UpdateStoreRelationAdminQuery,
  UpdateStoreRelationAdminResponse,
} from '../../types/api';

export const addStoreRelationAdminController = async (
  req: Request<
    AddStoreRelationAdminParams,
    unknown,
    AddStoreRelationAdminBody,
    AddStoreRelationAdminQuery
  >,
  res: Response<AddStoreRelationAdminResponse | ErrorResponse>,
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

export const updateStoreRelationAdminController = async (
  req: Request<
    UpdateStoreRelationAdminParams,
    unknown,
    UpdateStoreRelationAdminBody,
    UpdateStoreRelationAdminQuery
  >,
  res: Response<UpdateStoreRelationAdminResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { relationId } = req.params;
    const updatedRelation = req.body;

    await db.userStoreRelation.update({
      data: updatedRelation,
      where: { id: relationId },
    });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};

export const deleteStoreRelationAdminController = async (
  req: Request<
    DeleteStoreRelationAdminParams,
    unknown,
    DeleteStoreRelationAdminBody,
    DeleteStoreRelationAdminQuery
  >,
  res: Response<DeleteStoreRelationAdminResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { relationId } = req.params;

    await db.userStoreRelation.delete({ where: { id: relationId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
