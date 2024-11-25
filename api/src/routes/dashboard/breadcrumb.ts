import { Router } from 'express';
import { getBreadcrumbDashboardController } from '../../controllers/dashboard';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseDashboardRoutes } from '../../permissions/canUserDashboardRoutes';
import { getBreadcrumbDashboardSchema } from '../../schemas/dashboard';

const router = Router({ mergeParams: true });

router.get(
  '/',
  schemaValidatorMiddleware(getBreadcrumbDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  getBreadcrumbDashboardController,
);

export default router;
