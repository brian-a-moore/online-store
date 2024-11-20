import { roles } from '../../constants/seeds';
import { db } from '../db';

(async () => {
  await db.role.createMany({
    data: roles,
  });
})();
