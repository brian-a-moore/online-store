import { Router } from 'express';
import {
  createProductDashboardController,
  deleteProductDashboardController,
  getProductDashboardController,
  listProductsDashboardController,
  updateProductDashboardController,
} from '../../controllers_v2/dashboard';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseDashboardRoutes } from '../../permissions/canUserDashboardRoutes';
import {
  createProductDashboardSchema,
  deleteProductDashboardSchema,
  getProductDashboardSchema,
  listProductsDashboardSchema,
  updateProductDashboardSchema,
} from '../../schemas_v2/dashboard';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listProductsDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  listProductsDashboardController,
);
router.get(
  '/:productId',
  schemaValidatorMiddleware(getProductDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  getProductDashboardController,
);
router.delete(
  '/:productId',
  schemaValidatorMiddleware(deleteProductDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  deleteProductDashboardController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createProductDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  createProductDashboardController,
);
router.put(
  '/:productId',
  schemaValidatorMiddleware(updateProductDashboardSchema),
  checkPermissionMiddleware([canUseDashboardRoutes]),
  updateProductDashboardController,
);

export default router;
