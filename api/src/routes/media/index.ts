import { Router } from 'express';
import {
  getImageMediaController,
  uploadImageMediaController,
} from '../../controllers/media';
import { deleteImageMediaController } from '../../controllers/media/deleteImage';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseDashboardRoutes } from '../../permissions/canUserDashboardRoutes';
import {
  deleteImageMediaSchema,
  getImageMediaSchema,
  uploadImageMediaSchema,
} from '../../schemas/media';

const router = Router({ mergeParams: true });

router.delete(
  '/',
  schemaValidatorMiddleware(deleteImageMediaSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  deleteImageMediaController,
);
router.get(
  '/',
  schemaValidatorMiddleware(getImageMediaSchema),
  getImageMediaController,
);
router.post(
  '/',
  schemaValidatorMiddleware(uploadImageMediaSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  uploadImageMediaController,
);

export default router;
