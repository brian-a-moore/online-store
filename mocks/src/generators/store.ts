import { Prisma } from '../../../api/node_modules/@prisma/client/default';
import { db } from '../../../api/src/config/db';

export const generateStores = async () => {
  console.log('Creating stores...');

  const stores: Prisma.StoreUncheckedCreateInput[] = [
    {
      id: '46b2c710-df88-43f7-aa52-dc865f2b353e',
      name: 'Amazon',
      description:
        'Amazon is a global leader in e-commerce, cloud computing, and digital streaming, recognized for revolutionizing online shopping. Founded as a book retailer, it has grown into a comprehensive marketplace offering everything from electronics and clothing to groceries and entertainment. Amazon is renowned for its customer-centric approach, featuring personalized recommendations, Prime membership benefits, and rapid delivery services. Beyond retail, it dominates in cloud computing through AWS, offers innovative hardware like Alexa devices, and produces original content for Prime Video. With its focus on technology and innovation, Amazon has transformed consumer habits and reshaped industries worldwide.',
      isPublished: true,
    },
    {
      id: '633cd7e7-2673-4716-9753-944f0ffd23c1',
      name: 'Walmart',
      description:
        'Walmart is a multinational retail corporation that operates a vast network of hypermarkets, discount department stores, and grocery stores, primarily in the United States but also globally. Known for its emphasis on “Everyday Low Prices,” Walmart provides a wide range of products, from groceries and household essentials to electronics, apparel, and more. With a strong focus on physical retail, the company also integrates e-commerce to enhance its omnichannel shopping experience. Walmart serves millions of customers daily, offering affordability and convenience through its massive inventory, efficient supply chain, and customer-centric services like curbside pickup and delivery.',
      isPublished: true,
    },
  ];

  await db.store.createMany({ data: stores });

  console.log('Stores created');

  return stores.map((store) => store.id as string);
};
