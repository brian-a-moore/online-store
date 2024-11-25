import { hashString } from '@sunami/auth';
import { Prisma } from '../../../api/node_modules/@prisma/client/default';
import { db } from '../../../api/src/config/db';

export const generateSuperusers = async () => {
  console.log('Creating superusers...');

  const password = await hashString('Password123!');
  const superusers: Prisma.SuperuserUncheckedCreateInput[] = [
    {
      id: 'fadcb588-96aa-4428-aecc-45449d086aa6',
      email: 'brian-admin@sunami.io',
      name: 'Brian A. Moore',
      password,
    },
    {
      id: '46b2c710-df88-43f7-aa52-dc865f2b353e',
      email: 'joy-admin@sunami.io',
      name: 'Joy M. Holloway',
      password,
    },
    {
      id: '633cd7e7-2673-4716-9753-944f0ffd23c1',
      email: 'saraya-admin@sunami.io',
      name: 'Saraya C. Moore',
      password,
    },
  ];

  await db.superuser.createMany({ data: superusers });

  console.log('Superusers created');

  return superusers.map((superuser) => superuser.id);
};
