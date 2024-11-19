import { Router } from 'express';
import { createCheckoutSessionController } from '../controllers';
import checkPermissionMiddleware from '../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../middlewares/schemaValidator.middleware';
import { canAccessDefault } from '../permissions';
import { createCheckoutSessionSchema } from '../schemas';

const router = Router({ mergeParams: true });

router.post(
  '/checkout',
  schemaValidatorMiddleware(createCheckoutSessionSchema),
  checkPermissionMiddleware([canAccessDefault]),
  createCheckoutSessionController,
);

export default router;
