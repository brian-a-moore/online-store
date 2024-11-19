import { Router } from 'express';
import {
  createStoreController,
  deleteStoreController,
  getStorePrivateController,
  listStoresPrivateController,
  updateStoreController,
} from '../../controllers';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import {
  createStoreSchema,
  deleteStoreSchema,
  getStorePrivateSchema,
  listStoresPrivateSchema,
  updateStoreSchema,
} from '../../schemas';

const router = Router({ mergeParams: true });

router.get('/list', schemaValidatorMiddleware(listStoresPrivateSchema), listStoresPrivateController);
router.get('/:storeId', schemaValidatorMiddleware(getStorePrivateSchema), getStorePrivateController);
router.post('/', schemaValidatorMiddleware(createStoreSchema), createStoreController);
router.put('/:storeId', schemaValidatorMiddleware(updateStoreSchema), updateStoreController);
router.delete('/:storeId', schemaValidatorMiddleware(deleteStoreSchema), deleteStoreController);

export default router;
