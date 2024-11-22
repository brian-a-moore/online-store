import { Router } from 'express';
import { getBreadcrumbController } from '../../controllers/ui/get';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import { getBreadcrumbSchema } from '../../schemas/ui';

const router = Router({ mergeParams: true });

router.get(
  '/breadcrumb',
  schemaValidatorMiddleware(getBreadcrumbSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getBreadcrumbController,
);

export default router;
