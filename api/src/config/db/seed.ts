import { roles } from '../../constants/seeds';
import prisma from '../db';

(async () => {
  await prisma.role.createMany({
    data: roles,
  });
})();
