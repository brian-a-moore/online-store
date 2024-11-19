import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductPrivateController,
  listProductsPrivateController,
  updateProductController,
} from '../../controllers';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import {
  createProductSchema,
  deleteProductSchema,
  getProductPrivateSchema,
  listProductsPrivateSchema,
  updateProductSchema,
} from '../../schemas';

const router = Router({ mergeParams: true });

router.get('/list', schemaValidatorMiddleware(listProductsPrivateSchema), listProductsPrivateController);
router.get('/:productId', schemaValidatorMiddleware(getProductPrivateSchema), getProductPrivateController);
router.post('/', schemaValidatorMiddleware(createProductSchema), createProductController);
router.put('/:productId', schemaValidatorMiddleware(updateProductSchema), updateProductController);
router.delete('/:productId', schemaValidatorMiddleware(deleteProductSchema), deleteProductController);

export default router;
