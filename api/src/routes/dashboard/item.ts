import { Router } from 'express';
import {
  createItemDashboardController,
  deleteItemDashboardController,
  getItemDashboardController,
  listItemsDashboardController,
  updateItemDashboardController,
} from '../../controllers/dashboard';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseDashboardRoutes } from '../../permissions/canUserDashboardRoutes';
import {
  createItemDashboardSchema,
  deleteItemDashboardSchema,
  getItemDashboardSchema,
  listItemsDashboardSchema,
  updateItemDashboardSchema,
} from '../../schemas/dashboard';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listItemsDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  listItemsDashboardController,
);
router.get(
  '/:itemId',
  schemaValidatorMiddleware(getItemDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  getItemDashboardController,
);
router.delete(
  '/:itemId',
  schemaValidatorMiddleware(deleteItemDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  deleteItemDashboardController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createItemDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  createItemDashboardController,
);
router.put(
  '/:itemId',
  schemaValidatorMiddleware(updateItemDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  updateItemDashboardController,
);

export default router;
