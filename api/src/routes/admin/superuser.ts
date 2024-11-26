import { Router } from 'express';
import {
  createSuperuserAdminController,
  deleteSuperuserAdminController,
  getSuperuserAdminController,
  listSuperusersAdminController,
  resetSuperuserPasswordAdminController,
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
  resetSuperuserPasswordAdminSchema,
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
router.get(
  '/:superuserId/password_reset',
  schemaValidatorMiddleware(resetSuperuserPasswordAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  resetSuperuserPasswordAdminController,
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
