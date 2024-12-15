import { Prisma } from '../../../api/node_modules/@prisma/client/default';
import { db } from '../../../api/src/config/db';

export const generateStores = async () => {
  console.log('Creating stores...');

  const stores: Prisma.StoreUncheckedCreateInput[] = [
    {
      id: '46b2c710-df88-43f7-aa52-dc865f2b353e',
      name: 'Carroll Magnet Middle School',
      description:
        'Carroll Magnet Middle School in Wake County, NC, is a magnet school that offers a dynamic learning environment focused on technology, leadership, and innovation. Known for its diverse student body and strong emphasis on STEAM (Science, Technology, Engineering, Arts, and Math) education, Carroll provides students with opportunities to engage in hands-on, project-based learning.',
      isPublished: true,
    },
    {
      id: '633cd7e7-2673-4716-9753-944f0ffd23c1',
      name: 'Sanderson High School',
      description:
        'Sanderson High School, also located in Wake County, NC, is a well-rounded public high school that prides itself on academic excellence, athletics, and a strong sense of community. With a variety of Advanced Placement (AP) courses, extracurricular activities, and competitive sports programs, Sanderson fosters student growth both inside and outside the classroom.',
      isPublished: true,
    },
  ];

  await db.store.createMany({ data: stores });

  console.log('Stores created');

  return stores.map((store) => store.id as string);
};
