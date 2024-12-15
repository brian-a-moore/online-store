import { STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
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

    const { filePath } = req.query;

    const uploadsDir = path.join(__dirname, '../../uploads');

    if (filePath && fs.existsSync(path.join(uploadsDir, filePath))) {
      res.sendFile(path.join(uploadsDir, filePath));
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
