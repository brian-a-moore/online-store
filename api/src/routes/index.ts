import { Router } from 'express';
import adminRoutes from './admin';
import authRoutes from './auth';
import dashboardRoutes from './dashboard';
import mediaRoutes from './media';
import publicRoutes from './public';

const router = Router({ mergeParams: true });

router.use('/admin', adminRoutes);
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/media', mediaRoutes);
router.use('/public', publicRoutes);

export default router;
