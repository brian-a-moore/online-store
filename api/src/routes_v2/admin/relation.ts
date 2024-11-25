import { Router } from 'express';
import {
  createStoreRelationAdminController,
  deleteStoreRelationAdminController,
  updateStoreRelationAdminController,
} from '../../controllers_v2/admin';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  createStoreRelationAdminSchema,
  deleteStoreRelationAdminSchema,
  updateStoreRelationAdminSchema,
} from '../../schemas_v2/admin';

const router = Router({ mergeParams: true });

router.delete(
  '/:relationId',
  schemaValidatorMiddleware(deleteStoreRelationAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteStoreRelationAdminController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createStoreRelationAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  createStoreRelationAdminController,
);
router.put(
  '/:relationId',
  schemaValidatorMiddleware(updateStoreRelationAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateStoreRelationAdminController,
);

export default router;
