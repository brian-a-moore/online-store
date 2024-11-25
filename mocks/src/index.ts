import { generateItems, generateProducts, generateStores, generateSuperusers, generateUsers } from './generators';

async function main() {
  try {
    console.log('MOCKING DATABASE: Started...');

    await generateSuperusers();
    await generateUsers();
    const storeIds = await generateStores();
    const productIds = await generateProducts(storeIds);
    await generateItems(productIds);

    console.log('MOCKING DATABASE: Completed');

    process.exit();
  } catch (e: any | unknown) {
    console.error('MOCKING DATABASE: Failed', e);
    process.exit(1);
  }
}

main();
