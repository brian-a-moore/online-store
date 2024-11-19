import { Router } from 'express';
import itemRoutes from './item';
import productRoutes from './product';
import storeRoutes from './store';

const router = Router({ mergeParams: true });

router.use('/item', itemRoutes);
router.use('/product', productRoutes);
router.use('/store', storeRoutes);

export default router;
