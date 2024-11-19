import { Router } from 'express';
import {
  createItemController,
  deleteItemController,
  getItemPrivateController,
  listItemsPrivateController,
  updateItemController,
} from '../../controllers';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import {
  createItemSchema,
  deleteItemSchema,
  getItemPrivateSchema,
  listItemsPrivateSchema,
  updateItemSchema,
} from '../../schemas';

const router = Router({ mergeParams: true });

router.get('/list', schemaValidatorMiddleware(listItemsPrivateSchema), listItemsPrivateController);
router.get('/:itemId', schemaValidatorMiddleware(getItemPrivateSchema), getItemPrivateController);
router.post('/', schemaValidatorMiddleware(createItemSchema), createItemController);
router.put('/:itemId', schemaValidatorMiddleware(updateItemSchema), updateItemController);
router.delete('/:itemId', schemaValidatorMiddleware(deleteItemSchema), deleteItemController);

export default router;
