import { Role } from '@prisma/client';

export const roles: Role[] = [
  {
    id: 1,
    name: 'Owner',
    description:
      'Can manage users and store settings for a specific store, and can manage products and items for that store',
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Can manage products and items for a specific store',
  },
];
