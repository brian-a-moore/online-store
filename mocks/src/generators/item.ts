import { Prisma } from '../../../api/node_modules/@prisma/client/default';
import { db } from '../../../api/src/config/db';

export const generateItems = async (productIds: { amazonProductIds: string[]; walmartProductIds: string[] }) => {
  console.log('Creating items...');

  const amazonProductOneItems: Prisma.ItemUncheckedCreateInput[] = [
    {
      id: '815e4487-a271-4f61-8be7-a95bc07d6fd0',
      productId: productIds.amazonProductIds[0],
      name: 'Air Jordan 12 Retro',
      description:
        'The Air Jordan 12 Retro is a reimagined version of the original Air Jordan 12, a classic basketball shoe first released in 1996. Known for its sleek, high-top design and luxurious materials, the AJ12 Retro features a premium leather upper with distinctive stitching inspired by the Japanese “rising sun” flag, delivering both durability and style. Equipped with Nike’s Zoom Air cushioning, a carbon fiber shank plate, and a herringbone-patterned outsole, the shoe offers exceptional comfort, support, and traction on the court. Revered for its bold colorways and rich heritage, the Air Jordan 12 Retro is a symbol of Michael Jordan’s excellence, famously worn during his “Flu Game” performance, and remains a highly sought-after sneaker for athletes and collectors alike.',
      image:
        'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/104/720/508/original/1373130_01.jpg.jpeg?action=crop&width=900',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 350,
      }),
    },
    {
      id: '92a1508e-ade7-4777-833b-038fa0592f3e',
      productId: productIds.amazonProductIds[0],
      name: 'Air Jordan 4 Retro',
      description:
        'The Air Jordan 4 Retro is a modern revival of the iconic Air Jordan 4, originally released in 1989 and designed by the legendary Tinker Hatfield. Known for its bold and innovative design, the AJ4 features a mix of leather, mesh, and synthetic materials, with signature details like visible air cushioning, winged eyelets, and a supportive midfoot strap for a secure fit. The shoe’s distinct silhouette, lightweight feel, and unparalleled performance made it a game-changer on the court and a streetwear staple off it. Revered for its variety of striking colorways and cultural impact, the Air Jordan 4 Retro blends classic style with contemporary updates, maintaining its status as a timeless favorite among sneaker enthusiasts and collectors.',
      image: 'https://solectionlv.com/cdn/shop/products/1_1_21becbf2-4e79-4994-be8a-d4cb1d18a031.jpg?v=1641849865',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 420,
      }),
    },
  ];
  const amazonProductTwoItems: Prisma.ItemUncheckedCreateInput[] = [
    {
      id: 'c90beb5d-054f-4a37-b461-a939aed01b15',
      productId: productIds.amazonProductIds[1],
      name: 'Xbox Series X',
      description:
        'Xbox is a gaming brand created by Microsoft that has become one of the most recognized names in the video game industry. Launched in 2001 with the original Xbox console, the brand has since expanded to include a series of powerful gaming consoles, such as the Xbox 360, Xbox One, and Xbox Series X|S. Known for its high-performance hardware, robust online multiplayer service via Xbox Live, and extensive game library, the Xbox platform caters to casual gamers and hardcore enthusiasts alike. The ecosystem integrates seamlessly with PC gaming through services like Xbox Game Pass, offering access to hundreds of games across platforms. With a focus on innovation, community, and cross-platform play, Xbox continues to redefine interactive entertainment while fostering a global network of players.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFRrbQ9WDJ6hiIreMaoOfVVLfR6gzKlr5bw&s',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 479,
      }),
    },
    {
      id: 'd6468ce2-3406-42d9-8e9e-7d1ce35ccf46',
      productId: productIds.amazonProductIds[1],
      name: 'Xbox Series S',
      description:
        'Xbox is a gaming brand created by Microsoft that has become one of the most recognized names in the video game industry. Launched in 2001 with the original Xbox console, the brand has since expanded to include a series of powerful gaming consoles, such as the Xbox 360, Xbox One, and Xbox Series X|S. Known for its high-performance hardware, robust online multiplayer service via Xbox Live, and extensive game library, the Xbox platform caters to casual gamers and hardcore enthusiasts alike. The ecosystem integrates seamlessly with PC gaming through services like Xbox Game Pass, offering access to hundreds of games across platforms. With a focus on innovation, community, and cross-platform play, Xbox continues to redefine interactive entertainment while fostering a global network of players.',
      image:
        'https://assets.xboxservices.com/assets/97/d3/97d3bf27-1a7d-4db6-85bc-929f2badf14e.png?n=389964_Buy-Box-0_857x676_01.png',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 349,
      }),
    },
  ];
  const walmartProductOneItems: Prisma.ItemUncheckedCreateInput[] = [
    {
      id: '69cd026c-0005-45fe-8343-e2accc4c030d',
      productId: productIds.walmartProductIds[0],
      name: "Ozark Trail, 4-Person Clip & Camp Dome Tent, 8' x 8.5'x 50”, 7.87 lbs",
      description:
        'Ozark Trail is Walmart’s exclusive outdoor recreation brand, offering an extensive range of affordable, durable gear for camping, hiking, and other outdoor activities. Known for its practicality and value, the brand provides products like tents, sleeping bags, backpacks, coolers, and cookware designed to meet the needs of both beginner and experienced outdoor enthusiasts. Ozark Trail balances quality with cost-effectiveness, making outdoor adventure accessible to a broad audience. With a focus on reliability and convenience, its gear is a popular choice for family camping trips, weekend getaways, and backyard adventures, embodying the spirit of exploration and the great outdoors.',
      image:
        'https://i5.walmartimages.com/seo/Ozark-Trail-8-x-8-5-x-50-4-Person-Clip-Camp-Dome-Tent_7610003e-44cc-44bb-8233-f045ff5e08f1.bf2296d5412c648b46e407a584196a54.jpeg',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 79,
      }),
    },
    {
      id: '21619609-4da5-4616-94d6-cad6b6dca75a',
      productId: productIds.walmartProductIds[0],
      name: 'Ozark Trail 12-Person Cabin Tent, with Convertible Screen Room',
      description:
        'Ozark Trail is Walmart’s exclusive outdoor recreation brand, offering an extensive range of affordable, durable gear for camping, hiking, and other outdoor activities. Known for its practicality and value, the brand provides products like tents, sleeping bags, backpacks, coolers, and cookware designed to meet the needs of both beginner and experienced outdoor enthusiasts. Ozark Trail balances quality with cost-effectiveness, making outdoor adventure accessible to a broad audience. With a focus on reliability and convenience, its gear is a popular choice for family camping trips, weekend getaways, and backyard adventures, embodying the spirit of exploration and the great outdoors.',
      image:
        'https://i5.walmartimages.com/seo/Ozark-Trail-12-Person-Cabin-Tent-with-Convertible-Screen-Room_ce455232-6439-4fec-984b-497faaa4ceae.10085e2811e514137c992e8a6a7fd23e.jpeg',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 224,
      }),
    },
  ];
  const walmartProductTwoItems: Prisma.ItemUncheckedCreateInput[] = [
    {
      id: 'cf366b92-bfbe-4e5f-b5e4-0a248d0c12d7',
      productId: productIds.walmartProductIds[1],
      name: 'Coleman 316 Series 120QT Hard Chest Cooler, Silver Ash',
      description:
        'Coleman is a renowned outdoor recreation brand with a legacy of over a century, celebrated for its reliable and innovative gear that enhances the camping and outdoor experience. Known for its iconic products like lanterns, coolers, stoves, tents, and sleeping bags, Coleman combines quality craftsmanship with functionality to cater to outdoor enthusiasts of all levels. The brand emphasizes durability and ease of use, making it a trusted choice for everything from rugged wilderness adventures to family camping trips. With its commitment to creating products that inspire people to connect with nature, Coleman remains a cornerstone of the outdoor industry.',
      image:
        'https://i5.walmartimages.com/seo/Coleman-2179160-316-Series-120QT-Hard-Chest-Cooler-Silver-Ash_60cc4f61-04d0-4bfa-9c1b-f35985994351.8b535c55f369aa160d6bcad227f40bd1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 5,
      }),
    },
    {
      id: '206db266-5e09-4469-ac6e-e09a9d0f5ea0',
      productId: productIds.walmartProductIds[1],
      name: 'Coleman Brand, Matchlight 10,000 BTU 2-Burner Propane Stove, black',
      description:
        'Coleman is a renowned outdoor recreation brand with a legacy of over a century, celebrated for its reliable and innovative gear that enhances the camping and outdoor experience. Known for its iconic products like lanterns, coolers, stoves, tents, and sleeping bags, Coleman combines quality craftsmanship with functionality to cater to outdoor enthusiasts of all levels. The brand emphasizes durability and ease of use, making it a trusted choice for everything from rugged wilderness adventures to family camping trips. With its commitment to creating products that inspire people to connect with nature, Coleman remains a cornerstone of the outdoor industry.',
      image:
        'https://i5.walmartimages.com/seo/Coleman-Brand-Matchlight-10-000-BTU-2-Burner-Propane-Stove-black_91d46721-8192-48a1-b990-db171cf23614.d9ffe85f76efd81d93d2517fc08a7682.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF',
      itemTypeId: 1,
      maxQuantityPerOrder: 10,
      isPublished: true,
      config: JSON.stringify({
        isRedeemable: false,
        price: 5,
      }),
    },
  ];

  await db.item.createMany({
    data: [...amazonProductOneItems, ...amazonProductTwoItems, ...walmartProductOneItems, ...walmartProductTwoItems],
  });

  console.log('Items created');
};
