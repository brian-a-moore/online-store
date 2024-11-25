import { Router } from 'express';
import {
  addStoreRelationDashboardController,
  deleteStoreRelationDashboardController,
  updateStoreRelationDashboardController,
} from '../../controllers/dashboard';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseDashboardRoutes } from '../../permissions/canUserDashboardRoutes';
import {
  addStoreRelationDashboardSchema,
  deleteStoreRelationDashboardSchema,
  updateStoreRelationDashboardSchema,
} from '../../schemas/dashboard';

const router = Router({ mergeParams: true });

router.post(
  '/',
  schemaValidatorMiddleware(addStoreRelationDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  addStoreRelationDashboardController,
);
router.put(
  '/:relationId',
  schemaValidatorMiddleware(updateStoreRelationDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  updateStoreRelationDashboardController,
);
router.delete(
  '/:relationId',
  schemaValidatorMiddleware(deleteStoreRelationDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  deleteStoreRelationDashboardController,
);

export default router;
