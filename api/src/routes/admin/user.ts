import { Router } from 'express';
import {
  createUserAdminController,
  deleteUserAdminController,
  getUserAdminController,
  listUsersAdminController,
  resetSuperuserPasswordAdminController,
  updateUserAdminController,
} from '../../controllers/admin';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import {
  createUserAdminSchema,
  deleteUserAdminSchema,
  getUserAdminSchema,
  listUsersAdminSchema,
  resetUserPasswordAdminSchema,
  updateUserAdminSchema,
} from '../../schemas/admin';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listUsersAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  listUsersAdminController,
);
router.get(
  '/:userId',
  schemaValidatorMiddleware(getUserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getUserAdminController,
);
router.get(
  '/:userId/password_reset',
  schemaValidatorMiddleware(resetUserPasswordAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  resetSuperuserPasswordAdminController,
);
router.delete(
  '/:userId',
  schemaValidatorMiddleware(deleteUserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteUserAdminController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createUserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  createUserAdminController,
);
router.put(
  '/:userId',
  schemaValidatorMiddleware(updateUserAdminSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateUserAdminController,
);

export default router;
