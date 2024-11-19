import { Router } from 'express';
import itemRoutes from './item';
import productRoutes from './product';
import storeRoutes from './store';
import userRoutes from './user';

const router = Router({ mergeParams: true });

router.use('/store/:storeId/product/:productId/item', itemRoutes);
router.use('/store/:storeId/product', productRoutes);
router.use('/store', storeRoutes);
router.use('/user', userRoutes);

export default router;
