import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { db } from '../../config/db';
import {
  ErrorResponse,
  GetImageMediaBody,
  GetImageMediaParams,
  GetImageMediaQuery,
  GetImageMediaResponse,
} from '../../types/api';

export const getImageMediaController = async (
  req: Request<
    GetImageMediaParams,
    unknown,
    GetImageMediaBody,
    GetImageMediaQuery
  >,
  res: Response<GetImageMediaResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    if (process.env.APP_ENV !== 'local') {
      res.status(STATUS_CODE.NOT_IMPLEMENTED).send();
    }

    const { storeId, productId, itemId } = req.query;

    if (!storeId && !productId && !itemId) {
      res
        .status(STATUS_CODE.BAD_INPUT)
        .json({ message: 'A store, product or item ID is required.' });
      return;
    }

    let pathName = '';

    if (itemId) {
      const item = await db.item.findUniqueOrThrow({
        where: { id: itemId },
        select: { image: true },
      });
      pathName = item.image || '';
    } else if (productId) {
      const product = await db.product.findUniqueOrThrow({
        where: { id: productId },
        select: { image: true },
      });
      pathName = product.image || '';
    } else {
      const store = await db.store.findUniqueOrThrow({
        where: { id: storeId },
        select: { image: true },
      });
      pathName = store.image || '';
    }

    const uploadsDir = path.join(__dirname, '../../uploads');

    if (fs.existsSync(path.join(uploadsDir, pathName))) {
      res.sendFile(path.join(uploadsDir, pathName));
    } else {
      const placeholderPath = path.join(
        __dirname,
        '../../static/images/placeholder.svg',
      );
      res.sendFile(placeholderPath);
    }
  } catch (e: any | unknown) {
    next(e);
  }
};
