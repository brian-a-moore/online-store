import { hashString } from '@sunami/auth';
import { STATUS_CODE } from '@sunami/constants';
import * as crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  CreateSuperuserAdminBody,
  CreateSuperuserAdminParams,
  CreateSuperuserAdminQuery,
  CreateSuperuserAdminResponse,
  DeleteSuperuserAdminBody,
  DeleteSuperuserAdminParams,
  DeleteSuperuserAdminQuery,
  DeleteSuperuserAdminResponse,
  ErrorResponse,
  GetSuperuserAdminBody,
  GetSuperuserAdminParams,
  GetSuperuserAdminQuery,
  GetSuperuserAdminResponse,
  ListSuperusersAdminBody,
  ListSuperusersAdminParams,
  ListSuperusersAdminQuery,
  ListSuperusersAdminResponse,
  UpdateSuperuserAdminBody,
  UpdateSuperuserAdminParams,
  UpdateSuperuserAdminQuery,
  UpdateSuperuserAdminResponse,
} from '../../types/api';
import { generatePassword } from '../../utils/auth';
import { getPageNumber } from '../../utils/queryParsing';

export const createSuperuserAdminController = async (
  req: Request<CreateSuperuserAdminParams, unknown, CreateSuperuserAdminBody, CreateSuperuserAdminQuery>,
  res: Response<CreateSuperuserAdminResponse | ErrorResponse>,
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
  res: Response<ListSuperusersAdminResponse | ErrorResponse>,
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
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      orderBy: {
        name: 'asc',
      },
    });

    res.status(STATUS_CODE.OKAY).json({ superusers });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getSuperuserAdminController = async (
  req: Request<GetSuperuserAdminParams, unknown, GetSuperuserAdminBody, GetSuperuserAdminQuery>,
  res: Response<GetSuperuserAdminResponse | ErrorResponse>,
  next: NextFunction,
) => {
  const { superuserId } = req.params;

  try {
    const superuser = await db.superuser.findUniqueOrThrow({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id: superuserId },
    });

    res.status(STATUS_CODE.OKAY).json({ superuser });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const updateSuperuserAdminController = async (
  req: Request<UpdateSuperuserAdminParams, unknown, UpdateSuperuserAdminBody, UpdateSuperuserAdminQuery>,
  res: Response<UpdateSuperuserAdminResponse | ErrorResponse>,
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
  res: Response<DeleteSuperuserAdminResponse | ErrorResponse>,
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
