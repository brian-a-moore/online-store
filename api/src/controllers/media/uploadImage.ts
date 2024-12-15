import { SIZE, STATUS_CODE } from '@sunami/constants';
import { NextFunction, Request, Response } from 'express';
import formidable, { Fields, File, Files } from 'formidable';
import fs from 'fs';
import path from 'path';
import {
  ErrorResponse,
  UploadImageMediaBody,
  UploadImageMediaParams,
  UploadImageMediaQuery,
  UploadImageMediaResponse,
} from '../../types/api';

export const uploadImageMediaController = async (
  req: Request<
    UploadImageMediaParams,
    unknown,
    UploadImageMediaBody,
    UploadImageMediaQuery
  >,
  res: Response<UploadImageMediaResponse | ErrorResponse>,
  next: NextFunction,
) => {
  try {
    if (process.env.APP_ENV !== 'local') {
      res.status(STATUS_CODE.NOT_IMPLEMENTED).send();
      return;
    }

    const { storeId, productId, itemId } = req.query;

    const form = formidable({ multiples: false });

    const { files }: { fields: Fields; files: Files } = await new Promise(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      },
    );

    const fileArray = files.image as unknown as File[];
    if (fileArray.length === 0) {
      throw new Error('No file uploaded');
    }
    const file = fileArray[0];

    console.log({ file });

    const fileSize = file.size;

    if (file.mimetype && !file.mimetype.startsWith('image/')) {
      throw new Error('File is not an image');
    }

    if (fileSize > SIZE.MB * 2) {
      res
        .status(STATUS_CODE.BAD_INPUT)
        .json({ message: 'File size exceeds 2MB' });
      return;
    }

    const ext = path.extname(file.originalFilename!);
    const newFileName = `${storeId}${productId ? `-${productId}` : ''}${itemId ? `-${itemId}` : ''}${ext}`;
    const newFilePath = path.join(__dirname, '../../uploads', newFileName);

    fs.rename(file.filepath, newFilePath, (err) => {
      if (err) {
        throw err;
      }

      res.status(STATUS_CODE.OKAY).send();
    });
  } catch (e: any | unknown) {
    next(e);
  }
};
