import { Router } from 'express';
import authRoutes from './auth';
import orderRoutes from './order';
import privateRoutes from './private';
import publicRoutes from './public';

const router = Router({ mergeParams: true });

router.use('/auth', authRoutes);
router.use('/admin', privateRoutes);
router.use('/order', orderRoutes);
router.use('/', publicRoutes);

export default router;
