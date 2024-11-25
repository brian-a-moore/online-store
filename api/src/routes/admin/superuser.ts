import { Router } from 'express';
import {
  createSuperuserAdminController,
  deleteSuperuserAdminController,
  getSuperuserAdminController,
  listSuperusersAdminController,
  updateSuperuserAdminController,
} from '../../controllers/admin';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  createSuperuserAdminSchema,
  deleteSuperuserAdminSchema,
  getSuperuserAdminSchema,
  listSuperusersAdminSchema,
  updateSuperuserAdminSchema,
} from '../../schemas/admin';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listSuperusersAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  listSuperusersAdminController,
);
router.get(
  '/:superuserId',
  schemaValidatorMiddleware(getSuperuserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getSuperuserAdminController,
);
router.delete(
  '/:superuserId',
  schemaValidatorMiddleware(deleteSuperuserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteSuperuserAdminController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createSuperuserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  createSuperuserAdminController,
);
router.put(
  '/:superuserId',
  schemaValidatorMiddleware(updateSuperuserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateSuperuserAdminController,
);

export default router;
