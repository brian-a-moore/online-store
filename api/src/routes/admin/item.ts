import { Router } from 'express';
import {
  deleteItemAdminController,
  getItemAdminController,
  listItemsAdminController,
  updateItemAdminController,
} from '../../controllers/admin';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  deleteItemAdminSchema,
  getItemAdminSchema,
  listItemsAdminSchema,
  updateItemAdminSchema,
} from '../../schemas/admin';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listItemsAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  listItemsAdminController,
);
router.get(
  '/:itemId',
  schemaValidatorMiddleware(getItemAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getItemAdminController,
);
router.delete(
  '/:itemId',
  schemaValidatorMiddleware(deleteItemAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteItemAdminController,
);
router.put(
  '/:itemId',
  schemaValidatorMiddleware(updateItemAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateItemAdminController,
);

export default router;
