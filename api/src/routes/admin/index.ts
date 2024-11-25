import { Router } from 'express';
import itemRoutes from './item';
import productRoutes from './product';
import relationRoutes from './relation';
import storeRoutes from './store';
import superuserRoutes from './superuser';
import userRoutes from './user';

const router = Router({ mergeParams: true });

router.use('/item', itemRoutes);
router.use('/product', productRoutes);
router.use('/relation', relationRoutes);
router.use('/store', storeRoutes);
router.use('/superuser', superuserRoutes);
router.use('/user', userRoutes);

export default router;
