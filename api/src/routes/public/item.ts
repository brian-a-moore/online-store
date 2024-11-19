import { Router } from 'express';
import { getItemPublic, listItemsPublic } from '../../controllers';

const router = Router({ mergeParams: true });

router.get('/list', listItemsPublic);
router.get('/:itemId', getItemPublic);

export default router;
