import { Router } from 'express';
import {
  createItemController,
  deleteItemController,
  getItemPrivateController,
  listItemsPrivateController,
  updateItemController,
} from '../../controllers';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  createItemSchema,
  deleteItemSchema,
  getItemPrivateSchema,
  listItemsPrivateSchema,
  updateItemSchema,
} from '../../schemas';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listItemsPrivateSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  listItemsPrivateController,
);
router.get(
  '/:itemId',
  schemaValidatorMiddleware(getItemPrivateSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getItemPrivateController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createItemSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  createItemController,
);
router.put(
  '/:itemId',
  schemaValidatorMiddleware(updateItemSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateItemController,
);
router.delete(
  '/:itemId',
  schemaValidatorMiddleware(deleteItemSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteItemController,
);

export default router;
