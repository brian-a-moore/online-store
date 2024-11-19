import { Router } from 'express';
import { createItem, deleteItem, getItemPrivate, listItemsPrivate, updateItem } from '../../controllers';

const router = Router({ mergeParams: true });

router.get('/list', listItemsPrivate);
router.get('/:itemId', getItemPrivate);
router.post('/', createItem);
router.put('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);

export default router;
