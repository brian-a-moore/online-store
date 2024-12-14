import { Prisma } from '../../../api/node_modules/@prisma/client/default';
import { db } from '../../../api/src/config/db';

export const generateProducts = async (storeIds: string[]) => {
  console.log('Creating products...');

  const amazonProducts: Prisma.ProductUncheckedCreateInput[] = [
    {
      id: 'ef8f05bf-c839-41ea-ae5a-05733f87656a',
      storeId: storeIds[0],
      name: 'Nike Jordan',
      description:
        'Nike Jordans, also known as Air Jordans, are an iconic line of basketball shoes and athletic apparel created by Nike in collaboration with basketball legend Michael Jordan. First introduced in 1984, the brand revolutionized athletic footwear with its bold designs, advanced technology, and cultural influence. Known for their performance on the court and status as a fashion statement off the court, Jordans combine high-quality materials with cutting-edge features like air cushioning for comfort and support. Over the decades, the brand has released numerous models and retro editions, each with a unique style and story, making them a favorite among athletes, sneaker enthusiasts, and collectors alike. Jordans remain a symbol of sports excellence, innovation, and streetwear culture.',
      image:
        'https://i.pinimg.com/originals/8f/15/ea/8f15ea68524dc05acf40c69ed4adcb09.jpg',
      isPublished: true,
    },
    {
      id: 'fd8680ae-057a-4fd6-8397-af92b163c18b',
      storeId: storeIds[0],
      name: 'Microsoft Xbox',
      description:
        'Xbox is a gaming brand created by Microsoft that has become one of the most recognized names in the video game industry. Launched in 2001 with the original Xbox console, the brand has since expanded to include a series of powerful gaming consoles, such as the Xbox 360, Xbox One, and Xbox Series X|S. Known for its high-performance hardware, robust online multiplayer service via Xbox Live, and extensive game library, the Xbox platform caters to casual gamers and hardcore enthusiasts alike. The ecosystem integrates seamlessly with PC gaming through services like Xbox Game Pass, offering access to hundreds of games across platforms. With a focus on innovation, community, and cross-platform play, Xbox continues to redefine interactive entertainment while fostering a global network of players.',
      image:
        'https://i.pinimg.com/originals/69/af/1b/69af1b021e6fe4d37383f80cdaf0cc26.png',
      isPublished: true,
    },
  ];
  const walmartProducts: Prisma.ProductUncheckedCreateInput[] = [
    {
      id: '0800c253-fd54-4ef7-ad00-9c7a624c6d0c',
      storeId: storeIds[1],
      name: 'Ozark Trail',
      description:
        'Ozark Trail is Walmart’s exclusive outdoor recreation brand, offering an extensive range of affordable, durable gear for camping, hiking, and other outdoor activities. Known for its practicality and value, the brand provides products like tents, sleeping bags, backpacks, coolers, and cookware designed to meet the needs of both beginner and experienced outdoor enthusiasts. Ozark Trail balances quality with cost-effectiveness, making outdoor adventure accessible to a broad audience. With a focus on reliability and convenience, its gear is a popular choice for family camping trips, weekend getaways, and backyard adventures, embodying the spirit of exploration and the great outdoors.',
      image:
        'https://i5.walmartimages.com/asr/7d753180-c58d-40f7-a2bc-36ea4f850ad9.871585b7dbab6d5a87dd3ab2c5c2dbca.jpeg',
      isPublished: true,
    },
    {
      id: '7a2a2b0b-5df9-4831-b90c-2b03698621fa',
      storeId: storeIds[1],
      name: 'Coleman',
      description:
        'Coleman is a renowned outdoor recreation brand with a legacy of over a century, celebrated for its reliable and innovative gear that enhances the camping and outdoor experience. Known for its iconic products like lanterns, coolers, stoves, tents, and sleeping bags, Coleman combines quality craftsmanship with functionality to cater to outdoor enthusiasts of all levels. The brand emphasizes durability and ease of use, making it a trusted choice for everything from rugged wilderness adventures to family camping trips. With its commitment to creating products that inspire people to connect with nature, Coleman remains a cornerstone of the outdoor industry.',
      image:
        'https://i5.walmartimages.com/asr/5ecdea25-8c8c-44a2-9d84-88acc7dedc35.e32a561b21975278f4b4cc9765735b50.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF',
      isPublished: true,
    },
  ];

  await db.product.createMany({
    data: [...amazonProducts, ...walmartProducts],
  });

  console.log('Products created');

  return {
    amazonProductIds: amazonProducts.map((product) => product.id as string),
    walmartProductIds: walmartProducts.map((product) => product.id as string),
  };
};
