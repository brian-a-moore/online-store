import { Router } from 'express';
import authRoutes from './auth';
import privateRoutes from './private';
import publicRoutes from './public';

const router = Router({ mergeParams: true });

router.use('/auth', authRoutes);
router.use('/admin', privateRoutes);
router.use('/', publicRoutes);

export default router;
