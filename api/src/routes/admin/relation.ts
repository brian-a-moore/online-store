import { Router } from 'express';
import {
  addStoreRelationAdminController,
  deleteStoreRelationAdminController,
  updateStoreRelationAdminController,
} from '../../controllers/admin';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  addStoreRelationAdminSchema,
  deleteStoreRelationAdminSchema,
  updateStoreRelationAdminSchema,
} from '../../schemas/admin';

const router = Router({ mergeParams: true });

router.delete(
  '/:relationId',
  schemaValidatorMiddleware(deleteStoreRelationAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteStoreRelationAdminController,
);
router.post(
  '/',
  schemaValidatorMiddleware(addStoreRelationAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  addStoreRelationAdminController,
);
router.put(
  '/:relationId',
  schemaValidatorMiddleware(updateStoreRelationAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateStoreRelationAdminController,
);

export default router;
