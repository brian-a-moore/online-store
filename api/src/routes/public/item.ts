import { Router } from 'express';
import { getItemPublicController, listItemsPublicController } from '../../controllers';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canAccessDefault } from '../../permissions';
import { getItemPublicSchema, listItemsPublicSchema } from '../../schemas';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listItemsPublicSchema),
  checkPermissionMiddleware([canAccessDefault]),
  listItemsPublicController,
);
router.get(
  '/:itemId',
  schemaValidatorMiddleware(getItemPublicSchema),
  checkPermissionMiddleware([canAccessDefault]),
  getItemPublicController,
);

export default router;
