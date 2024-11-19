import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUsersController,
  updateUserController,
} from '../../controllers';
import schemaValidatorMiddleware from '../../middlewares/schemaValidator.middleware';
import { createUserSchema, deleteUserSchema, getUserSchema, listUsersSchema, updateUserSchema } from '../../schemas';

const router = Router({ mergeParams: true });

router.get('/list', schemaValidatorMiddleware(listUsersSchema), listUsersController);
router.get('/:userId', schemaValidatorMiddleware(getUserSchema), getUserController);
router.post('/', schemaValidatorMiddleware(createUserSchema), createUserController);
router.put('/:userId', schemaValidatorMiddleware(updateUserSchema), updateUserController);
router.delete('/:userId', schemaValidatorMiddleware(deleteUserSchema), deleteUserController);

export default router;
