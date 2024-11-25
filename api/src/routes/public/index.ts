import { Router } from 'express';
import {
  getProductPublicController,
  getStorePublicController,
  listItemsPublicController,
  listProductsPublicController,
  listStoresPublicController,
} from '../../controllers/public';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import {
  getProductPublicSchema,
  getStorePublicSchema,
  listItemsPublicSchema,
  listProductsPublicSchema,
  listStoresPublicSchema,
} from '../../schemas/public';

const router = Router({ mergeParams: true });

router.get('/store/list', schemaValidatorMiddleware(listStoresPublicSchema), listStoresPublicController);
router.get('/store/:storeId', schemaValidatorMiddleware(getStorePublicSchema), getStorePublicController);
router.get('/product/list', schemaValidatorMiddleware(listProductsPublicSchema), listProductsPublicController);
router.get('/product/:productId', schemaValidatorMiddleware(getProductPublicSchema), getProductPublicController);
router.get('/item/list', schemaValidatorMiddleware(listItemsPublicSchema), listItemsPublicController);

export default router;
