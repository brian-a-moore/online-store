import { Router } from 'express';
import { getItemPublicController, listItemsPublicController } from '../../controllers';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { getItemPublicSchema, listItemsPublicSchema } from '../../schemas';

const router = Router({ mergeParams: true });

router.get('/list', schemaValidatorMiddleware(listItemsPublicSchema), listItemsPublicController);
router.get('/:itemId', schemaValidatorMiddleware(getItemPublicSchema), getItemPublicController);

export default router;
