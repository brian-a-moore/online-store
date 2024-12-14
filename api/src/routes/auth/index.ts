import { Router } from 'express';
import {
  changePasswordAuthController,
  loginAuthController,
  verifyTokenAuthController,
} from '../../controllers/auth';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import {
  changePasswordAuthSchema,
  loginAuthSchema,
  verifyTokenAuthSchema,
} from '../../schemas/auth';

const router = Router({ mergeParams: true });

router.post(
  '/login',
  schemaValidatorMiddleware(loginAuthSchema),
  loginAuthController,
);
router.post(
  '/verify_token',
  schemaValidatorMiddleware(verifyTokenAuthSchema),
  verifyTokenAuthController,
);
router.put(
  '/password',
  schemaValidatorMiddleware(changePasswordAuthSchema),
  changePasswordAuthController,
);

export default router;
