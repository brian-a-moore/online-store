import { Prisma } from '../../../api/node_modules/@prisma/client/default';
import { db } from '../../../api/src/config/db';

export const generateProducts = async (storeIds: string[]) => {
  console.log('Creating products...');

  const carrollProducts: Prisma.ProductUncheckedCreateInput[] = [
    {
      id: 'ef8f05bf-c839-41ea-ae5a-05733f87656a',
      storeId: storeIds[0],
      name: 'CMMS Theatre Company',
      description:
        'The CMMS Theatre Company at Carroll Magnet Middle School is a vibrant and inclusive program dedicated to nurturing young performers’ talents and fostering a love for the performing arts. Known for its high-quality productions, the program provides students with opportunities to engage in all aspects of theater, including acting, stagecraft, and technical design. With a focus on creativity, collaboration, and building confidence, CMMS Theatre Company encourages students to explore their potential both on stage and behind the scenes. ',
      isPublished: true,
    },
    {
      id: 'fd8680ae-057a-4fd6-8397-af92b163c18b',
      storeId: storeIds[0],
      name: 'CMMS Conert Band Program',
      description:
        'The Carroll Magnet Middle School Band Program offers students a dynamic and enriching opportunity to explore instrumental music in a collaborative and supportive environment. Focused on developing musical skills, teamwork, and creativity, the program provides students with a strong foundation in performance and music theory. Through concerts, competitions, and other events, the CMMS Band Program encourages students to grow as musicians while fostering a lifelong appreciation for music.',
      isPublished: true,
    },
  ];
  const sandersonProducts: Prisma.ProductUncheckedCreateInput[] = [
    {
      id: '0800c253-fd54-4ef7-ad00-9c7a624c6d0c',
      storeId: storeIds[1],
      name: 'Sanderson High School Chiors',
      description:
        'The Sanderson High School Choirs program is dedicated to cultivating musical excellence and fostering a sense of community through choral performance. With a variety of ensembles, the program provides students opportunities to develop their vocal skills, perform diverse repertoire, and engage in local and regional competitions. Through concerts and events, Sanderson Choirs inspire a love for music while promoting teamwork, artistry, and personal growth.',
      isPublished: true,
    },
    {
      id: '7a2a2b0b-5df9-4831-b90c-2b03698621fa',
      storeId: storeIds[1],
      name: 'Marching Band',
      description:
        "The Sanderson Band has a long history of excellence, dating back to the school's opening in 1968. Currently, the Sanderson Band program consists of the Marching Spartans, Wind Ensemble, Concert Band, and various other small ensembles, as well as annual performances with the Sanderson Theater Department in the spring musical. The band has performed extensively across North Carolina and the Southeastern United States in both marching band competitions and concert band festivals. ",
      isPublished: true,
    },
  ];

  await db.product.createMany({
    data: [...carrollProducts, ...sandersonProducts],
  });

  console.log('Products created');

  return {
    carrollProductIds: carrollProducts.map((product) => product.id as string),
    sandersonProductIds: sandersonProducts.map(
      (product) => product.id as string,
    ),
  };
};
