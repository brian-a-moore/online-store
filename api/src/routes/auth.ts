import { Router } from 'express';
import { authLoginController, authVerifyTokenController } from '../controllers';
import schemaValidatorMiddleware from '../middlewares/schemaValidator.middleware';
import { authLoginSchema, authVerifyTokenSchema } from '../schemas';

const router = Router({ mergeParams: true });

router.post('/login', schemaValidatorMiddleware(authLoginSchema), authLoginController);
router.post('/verify_token', schemaValidatorMiddleware(authVerifyTokenSchema), authVerifyTokenController);

export default router;
