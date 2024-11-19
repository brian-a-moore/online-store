import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUsersController,
  updateUserController,
} from '../../controllers';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import { createUserSchema, deleteUserSchema, getUserSchema, listUsersSchema, updateUserSchema } from '../../schemas';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listUsersSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  listUsersController,
);
router.get(
  '/:userId',
  schemaValidatorMiddleware(getUserSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getUserController,
);
router.post(
  '/',
  schemaValidatorMiddleware(createUserSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  createUserController,
);
router.put(
  '/:userId',
  schemaValidatorMiddleware(updateUserSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  updateUserController,
);
router.delete(
  '/:userId',
  schemaValidatorMiddleware(deleteUserSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  deleteUserController,
);

export default router;
