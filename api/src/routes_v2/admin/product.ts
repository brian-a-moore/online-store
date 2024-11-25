import { Router } from 'express';
import {
  deleteProductAdminController,
  getProductAdminController,
  listProductsAdminController,
  updateProductAdminController,
} from '../../controllers_v2/admin';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  deleteProductAdminSchema,
  getProductAdminSchema,
  listProductsAdminSchema,
  updateProductAdminSchema,
} from '../../schemas_v2/admin';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listProductsAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  listProductsAdminController,
);
router.get(
  '/:productId',
  schemaValidatorMiddleware(getProductAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getProductAdminController,
);
router.delete(
  '/:productId',
  schemaValidatorMiddleware(deleteProductAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteProductAdminController,
);
router.put(
  '/:productId',
  schemaValidatorMiddleware(updateProductAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateProductAdminController,
);

export default router;
