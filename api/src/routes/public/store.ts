import { Router } from 'express';
import { getStorePublic, listStoresPublic } from '../../controllers';

const router = Router({ mergeParams: true });

router.get('/list', listStoresPublic);
router.get('/:storeId', getStorePublic);

export default router;
