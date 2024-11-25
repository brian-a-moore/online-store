import { Router } from 'express';
import {
  createStoreAdminController,
  deleteStoreAdminController,
  getStoreAdminController,
  listStoresAdminController,
  updateStoreAdminController,
} from '../../controllers/admin';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  createStoreAdminSchema,
  deleteStoreAdminSchema,
  getStoreAdminSchema,
  listStoresAdminSchema,
  updateStoreAdminSchema,
} from '../../schemas/admin';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listStoresAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  listStoresAdminController,
);
router.get(
  '/:storeId',
  schemaValidatorMiddleware(getStoreAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getStoreAdminController,
);
router.delete(
  '/:storeId',
  schemaValidatorMiddleware(deleteStoreAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteStoreAdminController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createStoreAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  createStoreAdminController,
);
router.put(
  '/:storeId',
  schemaValidatorMiddleware(updateStoreAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateStoreAdminController,
);

export default router;
