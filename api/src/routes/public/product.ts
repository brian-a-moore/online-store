import { Router } from 'express';
import { getItemPublic, listProductsPublic } from '../../controllers';

const router = Router({ mergeParams: true });

router.get('/list', listProductsPublic);
router.get('/:productId', getItemPublic);

export default router;
