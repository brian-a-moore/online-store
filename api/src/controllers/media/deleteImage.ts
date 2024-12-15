import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { db } from '../../config/db';
import {
  DeleteImageMediaBody,
  DeleteImageMediaParams,
  DeleteImageMediaQuery,
  DeleteImageMediaResponse,
  ErrorResponse,
} from '../../types/api';

export const deleteImageMediaController = async (
  req: Request<
    DeleteImageMediaParams,
    unknown,
    DeleteImageMediaBody,
    DeleteImageMediaQuery
  >,
  res: Response<DeleteImageMediaResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    if (process.env.APP_ENV !== 'local') {
      res.status(STATUS_CODE.NOT_IMPLEMENTED).send();
    }

    const { filePath } = req.query;
    const [key, idWithExt] = filePath.split(':');
    const uploadsDir = path.join(__dirname, '../../uploads');

    await fs.unlink(path.join(uploadsDir, filePath), async (err) => {
      if (err) {
        throw err;
      }
      const id = idWithExt.split('.')[0];
      if (key === 'storeId') {
        await db.store.update({ data: { image: null }, where: { id } });
      } else if (key === 'productId') {
        await db.product.update({ data: { image: null }, where: { id } });
      } else if (key === 'itemId') {
        await db.item.update({ data: { image: null }, where: { id } });
      } else {
        throw new Error(`Unable to delete image with key: ${key}`);
      }
    });

    res.status(STATUS_CODE.OKAY).send();
  } catch (e: any | unknown) {
    next(e);
  }
};
