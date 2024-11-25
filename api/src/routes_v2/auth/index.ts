import { Router } from 'express';
import {
  changePasswordAuthController,
  loginAuthController,
  verifyTokenAuthController,
} from '../../controllers_v2/auth';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { changePasswordAuthSchema, loginAuthSchema, verifyTokenAuthSchema } from '../../schemas_v2/auth';

const router = Router({ mergeParams: true });

router.post('/login', schemaValidatorMiddleware(loginAuthSchema), loginAuthController);
router.post('/verify_token', schemaValidatorMiddleware(verifyTokenAuthSchema), verifyTokenAuthController);
router.put('/password', schemaValidatorMiddleware(changePasswordAuthSchema), changePasswordAuthController);

export default router;
