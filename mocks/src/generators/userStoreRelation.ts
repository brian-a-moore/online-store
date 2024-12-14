import { Prisma } from '../../../api/node_modules/@prisma/client/default';
import { db } from '../../../api/src/config/db';

export const generateUserStoreRelations = async (
  ids: string[],
  storeIds: string[],
) => {
  console.log('Creating user-store relations...');

  const relations: Prisma.UserStoreRelationUncheckedCreateInput[] = [];

  storeIds.forEach((storeId) => {
    ids.forEach((id, index) => {
      relations.push({
        userId: id,
        storeId,
        roleId: index === 0 ? 1 : 2,
      });
    });
  });

  await db.userStoreRelation.createMany({ data: relations });

  console.log('User-store relations created');
};
