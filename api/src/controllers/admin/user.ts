import { hashString } from '@sunami/auth';
import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import { db } from '../../config/db';
import { PAGE_SIZE } from '../../constants';
import {
  CreateUserAdminBody,
  CreateUserAdminParams,
  CreateUserAdminQuery,
  DeleteUserAdminBody,
  DeleteUserAdminParams,
  DeleteUserAdminQuery,
  ErrorResponse,
  GetUserAdminBody,
  GetUserAdminParams,
  GetUserAdminQuery,
  ListUsersAdminBody,
  ListUsersAdminParams,
  ListUsersAdminQuery,
  UpdateUserAdminBody,
  UpdateUserAdminParams,
  UpdateUserAdminQuery,
} from '../../types/api';
import { generatePassword } from '../../utils/auth';
import { getPageNumber } from '../../utils/queryParsing';

export const createUserAdminController = async (
  req: Request<CreateUserAdminParams, unknown, CreateUserAdminBody, CreateUserAdminQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const incomingUser = req.body;

    const id = crypto.randomUUID();
    const password = generatePassword();
    const passwordHash = await hashString(password);

    await db.user.create({
      data: {
        ...incomingUser,
        password: passwordHash,
        id,
      },
    });

    res.status(STATUS_CODE.OKAY).json({ id, defaultPassword: password });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const listUsersAdminController = async (
  req: Request<ListUsersAdminParams, unknown, ListUsersAdminBody, ListUsersAdminQuery>,
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

    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        updatedAt: true,
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    });

    res.status(STATUS_CODE.OKAY).json({ users });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const getUserAdminController = async (
  req: Request<GetUserAdminParams, unknown, GetUserAdminBody, GetUserAdminQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  const { userId } = req.params;

  try {
    const user = await db.user.findUniqueOrThrow({
      where: { id: userId },
    });

    res.status(STATUS_CODE.OKAY).json({ user });
  } catch (e: any | unknown) {
    next(e);
  }
};

export const updateUserAdminController = async (
  req: Request<UpdateUserAdminParams, unknown, UpdateUserAdminBody, UpdateUserAdminQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const updatedUserFields = req.body;

    await db.user.update({ data: updatedUserFields, where: { id: userId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};

export const deleteUserAdminController = async (
  req: Request<DeleteUserAdminParams, unknown, DeleteUserAdminBody, DeleteUserAdminQuery>,
  res: Response<any | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    await db.user.delete({ where: { id: userId } });

    res.status(STATUS_CODE.NO_CONTENT).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
