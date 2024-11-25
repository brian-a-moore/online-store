import { Prisma } from '../../../api/node_modules/@prisma/client/default';
import { db } from '../../../api/src/config/db';

export const generateUserStoreRelations = async (id: string, storeIds: string[]) => {
  console.log('Creating user-store relations...');

  const relations: Prisma.UserStoreRelationUncheckedCreateInput[] = [];

  storeIds.forEach((storeId) => {
    relations.push({
      userId: id,
      storeId,
      roleId: 1,
    });
  });

  await db.userStoreRelation.createMany({ data: relations });

  console.log('User-store relations created');
};
