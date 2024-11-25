import { Router } from 'express';
import breadcrumbRoutes from './breadcrumb';
import itemRoutes from './item';
import productRoutes from './product';
import relationRoutes from './relation';
import storeRoutes from './store';
import userRoutes from './user';

const router = Router({ mergeParams: true });

router.use('/breadcrumb', breadcrumbRoutes);
router.use('/item', itemRoutes);
router.use('/product', productRoutes);
router.use('/relation', relationRoutes);
router.use('/store', storeRoutes);
router.use('/user', userRoutes);

export default router;
