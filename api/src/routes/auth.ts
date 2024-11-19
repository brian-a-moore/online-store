import { Router } from 'express';
import { authLoginController, authVerifyTokenController } from '../controllers';
import checkPermissionMiddleware from '../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../middlewares/schemaValidator.middleware';
import { canAccessDefault } from '../permissions';
import { authLoginSchema, authVerifyTokenSchema } from '../schemas';

const router = Router({ mergeParams: true });

router.post(
  '/login',
  schemaValidatorMiddleware(authLoginSchema),
  checkPermissionMiddleware([canAccessDefault]),
  authLoginController,
);
router.post(
  '/verify_token',
  schemaValidatorMiddleware(authVerifyTokenSchema),
  checkPermissionMiddleware([canAccessDefault]),
  authVerifyTokenController,
);

export default router;
