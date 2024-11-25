import { hashString } from '@sunami/auth';
import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  CreateSuperuserAdminBody,
  CreateSuperuserAdminParams,
  CreateSuperuserAdminQuery,
  DeleteSuperuserAdminBody,
  DeleteSuperuserAdminParams,
  DeleteSuperuserAdminQuery,
  ErrorResponse,
  GetSuperuserAdminBody,
  GetSuperuserAdminParams,
  GetSuperuserAdminQuery,
  ListSuperusersAdminBody,
  ListSuperusersAdminParams,
  ListSuperusersAdminQuery,
  UpdateSuperuserAdminBody,
  UpdateSuperuserAdminParams,
  UpdateSuperuserAdminQuery,
} from '../../types/api';
import { generatePassword } from '../../utils/auth';
import { getPageNumber } from '../../utils/queryParsing';

export const createSuperuserAdminController = async (
  req: Request<CreateSuperuserAdminParams, unknown, CreateSuperuserAdminBody, CreateSuperuserAdminQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const incomingSuperuser = req.body;

    const id = crypto.randomUUID();
    const password = generatePassword();
    const passwordHash = await hashString(password);

    await db.superuser.create({
      data: {
        ...incomingSuperuser,
        password: passwordHash,
        id,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ id, defaultPassword: password });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const listSuperusersAdminController = async (
  req: Request<ListSuperusersAdminParams, unknown, ListSuperusersAdminBody, ListSuperusersAdminQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    let page;

    try {
      page = getPageNumber(req.query.page);
    } catch (e: any | unknown) {
      res.status(STATUS_CODE.BAD_INPUT).json({ message: e.message });
      return;
    }

    const superusers = await db.superuser.findMany({
      select: {
        id: true,
        name: true,
        updatedAt: true,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ superusers });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getSuperuserAdminController = async (
  req: Request<GetSuperuserAdminParams, unknown, GetSuperuserAdminBody, GetSuperuserAdminQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  const { superuserId } = req.params;

  try {
    const superuser = await db.superuser.findUniqueOrThrow({
      where: { id: superuserId },
    });

    res.status(STATUS_CODE.OKAY).json({ superuser });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const updateSuperuserAdminController = async (
  req: Request<UpdateSuperuserAdminParams, unknown, UpdateSuperuserAdminBody, UpdateSuperuserAdminQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { superuserId } = req.params;
    const updatedSuperuserFields = req.body;

    await db.superuser.update({ data: updatedSuperuserFields, where: { id: superuserId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};

export const deleteSuperuserAdminController = async (
  req: Request<DeleteSuperuserAdminParams, unknown, DeleteSuperuserAdminBody, DeleteSuperuserAdminQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { superuserId } = req.params;

    await db.superuser.delete({ where: { id: superuserId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
