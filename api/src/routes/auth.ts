import { Router } from 'express';
import { authLogin, authVerifyToken } from '../controllers';

const router = Router({ mergeParams: true });

router.post('/login', authLogin);
router.post('/verify_token', authVerifyToken);

export default router;
