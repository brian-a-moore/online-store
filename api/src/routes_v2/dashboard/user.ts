import { Router } from 'express';
import { searchUsersDashboardController } from '../../controllers_v2/dashboard';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseDashboardRoutes } from '../../permissions/canUserDashboardRoutes';
import { searchUsersDashboardSchema } from '../../schemas_v2/dashboard';

const router = Router({ mergeParams: true });

router.get(
  '/search',
  schemaValidatorMiddleware(searchUsersDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  searchUsersDashboardController,
);

export default router;
