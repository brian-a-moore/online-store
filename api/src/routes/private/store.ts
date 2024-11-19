import { Router } from 'express';
import { createStore, deleteStore, getStorePrivate, listStoresPrivate, updateStore } from '../../controllers';

const router = Router({ mergeParams: true });

router.get('/list', listStoresPrivate);
router.get('/:storeId', getStorePrivate);
router.post('/', createStore);
router.put('/:storeId', updateStore);
router.delete('/:storeId', deleteStore);

export default router;
