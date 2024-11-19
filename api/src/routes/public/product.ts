import { Router } from 'express';
import { getProductPublicController, listProductsPublicController } from '../../controllers';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { getProductPublicSchema, listProductsPublicSchema } from '../../schemas';

const router = Router({ mergeParams: true });

router.get('/list', schemaValidatorMiddleware(listProductsPublicSchema), listProductsPublicController);
router.get('/:productId', schemaValidatorMiddleware(getProductPublicSchema), getProductPublicController);

export default router;
