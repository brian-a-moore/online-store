import { Router } from 'express';
import { getStorePublicController, listStoresPublicController } from '../../controllers';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { getStorePublicSchema, listStoresPublicSchema } from '../../schemas';

const router = Router({ mergeParams: true });

router.get('/list', schemaValidatorMiddleware(listStoresPublicSchema), listStoresPublicController);
router.get('/:storeId', schemaValidatorMiddleware(getStorePublicSchema), getStorePublicController);

export default router;
