import { Router } from 'express';
import { getTeamController } from '../../controllers/team/get';
import checkPermissionMiddleware from '../../middlewares/checkPermission.middleware';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { canUseAdminRoutes } from '../../permissions';
import { getTeamSchema } from '../../schemas/team';

const router = Router({ mergeParams: true });

router.get(
  '/list',
  schemaValidatorMiddleware(getTeamSchema),
  checkPermissionMiddleware([canUseAdminRoutes]),
  getTeamController,
);

export default router;
