import { Router } from 'express';
import { createUser, deleteUser, getUser, listUsers, updateUser } from '../../controllers';

const router = Router({ mergeParams: true });

router.get('/list', listUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
