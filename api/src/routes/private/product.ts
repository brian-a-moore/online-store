import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductPrivateController,
  listProductsPrivateController,
  updateProductController,
} from '../../controllers';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  createProductSchema,
  deleteProductSchema,
  getProductPrivateSchema,
  listProductsPrivateSchema,
  updateProductSchema,
} from '../../schemas';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listProductsPrivateSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  listProductsPrivateController,
);
router.get(
  '/:productId',
  schemaValidatorMiddleware(getProductPrivateSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getProductPrivateController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createProductSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  createProductController,
);
router.put(
  '/:productId',
  schemaValidatorMiddleware(updateProductSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateProductController,
);
router.delete(
  '/:productId',
  schemaValidatorMiddleware(deleteProductSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteProductController,
);

export default router;
