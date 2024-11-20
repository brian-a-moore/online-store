import { itemTypes, roles } from '../../constants/seeds';
import { db } from '../db';

(async () => {
  await db.itemType.createMany({
    data: itemTypes,
  });
  await db.role.createMany({
    data: roles,
  });
})();
