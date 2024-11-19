import { Router } from 'express';
import { getStorePublicController, listStoresPublicController } from '../../controllers';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canAccessDefault } from '../../permissions';
import { getStorePublicSchema, listStoresPublicSchema } from '../../schemas';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listStoresPublicSchema),
  checkPermissionMiddleware([canAccessDefault]),
  listStoresPublicController,
);
router.get(
  '/:storeId',
  schemaValidatorMiddleware(getStorePublicSchema),
  checkPermissionMiddleware([canAccessDefault]),
  getStorePublicController,
);

export default router;
