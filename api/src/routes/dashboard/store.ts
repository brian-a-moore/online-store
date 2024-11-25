import { Router } from 'express';
import {
  getStoreDashboardController,
  getStoreTeamDashboardController,
  listStoresDashboardController,
  updateStoreDashboardController,
} from '../../controllers/dashboard';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseDashboardRoutes } from '../../permissions/canUserDashboardRoutes';
import {
  getStoreDashboardSchema,
  getStoreTeamDashboardSchema,
  listStoresDashboardSchema,
  updateStoreDashboardSchema,
} from '../../schemas/dashboard';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listStoresDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  listStoresDashboardController,
);
router.get(
  '/:storeId/team',
  schemaValidatorMiddleware(getStoreTeamDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  getStoreTeamDashboardController,
);
router.get(
  '/:storeId',
  schemaValidatorMiddleware(getStoreDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  getStoreDashboardController,
);
router.put(
  '/:storeId',
  schemaValidatorMiddleware(updateStoreDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  updateStoreDashboardController,
);

export default router;
