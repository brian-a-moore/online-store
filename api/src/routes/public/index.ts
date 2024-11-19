import { Router } from 'express';
import itemRoutes from './item';
import productRoutes from './product';
import storeRoutes from './store';

const router = Router({ mergeParams: true });

router.use('/store/:storeId/product/:productId/item', itemRoutes);
router.use('/store/:storeId/product', productRoutes);
router.use('/store', storeRoutes);

export default router;
