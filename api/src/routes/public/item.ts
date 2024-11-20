import { Router } from 'express';
import { listItemsPublicController } from '../../controllers';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canAccessDefault } from '../../permissions';
import { listItemsPublicSchema } from '../../schemas';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(listItemsPublicSchema),
  checkPermissionMiddleware([canAccessDefault]),
  listItemsPublicController,
);

export default router;
