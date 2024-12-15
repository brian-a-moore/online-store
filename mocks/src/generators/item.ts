import { Prisma } from '../../../api/node_modules/@prisma/client/default';
import { db } from '../../../api/src/config/db';

export const generateItems = async (productIds: {
  carrollProductIds: string[];
  sandersonProductIds: string[];
}) => {
  console.log('Creating items...');

  const carrollProductOneItems: Prisma.ItemUncheckedCreateInput[] = [
    {
      id: '815e4487-a271-4f61-8be7-a95bc07d6fd0',
      productId: productIds.carrollProductIds[0],
      name: 'High School Musical Jr. - Standard Admission',
      description:
        'The CMMS Theatre Company is thrilled to bring Disney’s High School Musical to life on stage, showcasing the incredible talent and energy of its middle school performers. With catchy songs, lively choreography, and a heartwarming story, the production captures the spirit of teamwork, friendship, and following your dreams. This exciting performance promises to entertain audiences of all ages and highlight the hard work and dedication of the CMMS Theatre cast and crew.',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 10,
      }),
    },
    {
      id: '92a1508e-ade7-4777-833b-038fa0592f3e',
      productId: productIds.carrollProductIds[0],
      name: 'High School Musical Jr. - Student Admission',
      description:
        'The CMMS Theatre Company is thrilled to bring Disney’s High School Musical to life on stage, showcasing the incredible talent and energy of its middle school performers. With catchy songs, lively choreography, and a heartwarming story, the production captures the spirit of teamwork, friendship, and following your dreams. This exciting performance promises to entertain audiences of all ages and highlight the hard work and dedication of the CMMS Theatre cast and crew.',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 5,
      }),
    },
  ];
  const carrollProductTwoItems: Prisma.ItemUncheckedCreateInput[] = [
    {
      id: 'c86fa30c-45b8-4ff4-bc82-d810f80360a3',
      productId: productIds.carrollProductIds[1],
      name: 'Instrument Cleaning Kit',
      description: 'A cleaning kit for musical instruments.',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 30,
      }),
    },
    {
      id: 'efbea2ef-636b-424f-8ae7-ff023cbb70a8',
      productId: productIds.carrollProductIds[1],
      name: 'Replacement Reed Set',
      description: 'A set of replacement reeds for woodwind instruments.',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 20,
      }),
    },
  ];
  const sandersonProductOneItems: Prisma.ItemUncheckedCreateInput[] = [
    {
      id: '69cd026c-0005-45fe-8343-e2accc4c030d',
      productId: productIds.sandersonProductIds[0],
      name: 'Winter Concert - Family Admission',
      description:
        'The Sanderson High School Choirs will present a captivating Christmas concert, spreading holiday cheer through beautiful harmonies and festive melodies. Featuring traditional carols and modern holiday favorites, the performance will highlight the vocal talent and dedication of the choir students. This heartwarming event promises to bring the community together to celebrate the spirit of the season through music.',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 15,
      }),
    },
    {
      id: '21619609-4da5-4616-94d6-cad6b6dca75a',
      productId: productIds.sandersonProductIds[0],
      name: 'Winter Concert - Individual Admission',
      description:
        'The Sanderson High School Choirs will present a captivating Christmas concert, spreading holiday cheer through beautiful harmonies and festive melodies. Featuring traditional carols and modern holiday favorites, the performance will highlight the vocal talent and dedication of the choir students. This heartwarming event promises to bring the community together to celebrate the spirit of the season through music.',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 5,
      }),
    },
  ];
  const sandersonProductTwoItems: Prisma.ItemUncheckedCreateInput[] = [
    {
      id: 'cf366b92-bfbe-4e5f-b5e4-0a248d0c12d7',
      productId: productIds.sandersonProductIds[1],
      name: 'Marching Band Uniform Cleaning Service',
      description:
        'A one-time cleaning service for the Sanderson Marching Band uniforms.',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 49,
      }),
    },
    {
      id: '206db266-5e09-4469-ac6e-e09a9d0f5ea0',
      productId: productIds.sandersonProductIds[1],
      name: 'Instrument One-time Rental Fee',
      description:
        'A one-time rental fee for the Sanderson Marching Band instruments.',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 99,
      }),
    },
  ];

  await db.item.createMany({
    data: [
      ...carrollProductOneItems,
      ...carrollProductTwoItems,
      ...sandersonProductOneItems,
      ...sandersonProductTwoItems,
    ],
  });

  console.log('Items created');
};
