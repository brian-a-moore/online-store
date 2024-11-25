import { hashString } from '@sunami/auth';
import { Prisma } from '../../../api/node_modules/@prisma/client/default';
import { db } from '../../../api/src/config/db';

export const generateUsers = async () => {
  console.log('Creating users...');

  const password = await hashString('Password123!');
  const users: Prisma.UserUncheckedCreateInput[] = [
    {
      id: 'ff362a29-8c98-4e20-9955-742f7dfccc12',
      email: 'brian@sunami.io',
      name: 'Brian Moore',
      password,
    },
    {
      id: 'aee46fd6-83d6-4d19-bbcb-164ea54526d5',
      email: 'joy@sunami.io',
      name: 'Joy Holloway',
      password,
    },
    {
      id: 'fadcb588-96aa-4428-aecc-45449d086aa6',
      email: 'saraya@sunami.io',
      name: 'Saraya Moore',
      password,
    },
  ];

  await db.user.createMany({ data: users });

  console.log('Users created');

  return users.map((user) => user.id);
};
