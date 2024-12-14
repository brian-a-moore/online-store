import {
  generateItems,
  generateProducts,
  generateStores,
  generateSuperusers,
  generateUsers,
} from './generators';
import { generateUserStoreRelations } from './generators/userStoreRelation';

async function main() {
  try {
    console.log('Mocking database...');

    await generateSuperusers();
    const userIds = await generateUsers();
    const storeIds = await generateStores();
    const productIds = await generateProducts(storeIds);
    await generateUserStoreRelations(userIds as string[], storeIds);
    await generateItems(productIds);

    console.log('Mocking database completed');

    process.exit();
  } catch (e: any | unknown) {
    console.error('Mocking database failed', e);
    process.exit(1);
  }
}

main();
