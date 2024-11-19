import { Router } from 'express';
import { getProductPublicController, listProductsPublicController } from '../../controllers';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canAccessDefault } from '../../permissions';
import { getProductPublicSchema, listProductsPublicSchema } from '../../schemas';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listProductsPublicSchema),
  checkPermissionMiddleware([canAccessDefault]),
  listProductsPublicController,
);
router.get(
  '/:productId',
  schemaValidatorMiddleware(getProductPublicSchema),
  checkPermissionMiddleware([canAccessDefault]),
  getProductPublicController,
);

export default router;
