import { Router } from 'express';
import {
  getImageMediaController,
  uploadImageMediaController,
} from '../../controllers/media';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseDashboardRoutes } from '../../permissions/canUserDashboardRoutes';
import {
  getImageMediaSchema,
  uploadImageMediaSchema,
} from '../../schemas/media';

const router = Router({ mergeParams: true });

router.get(
  '/',
  schemaValidatorMiddleware(getImageMediaSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  getImageMediaController,
);
router.post(
  '/',
  schemaValidatorMiddleware(uploadImageMediaSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  uploadImageMediaController,
);

export default router;
