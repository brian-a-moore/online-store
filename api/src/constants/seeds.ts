import { Role } from '@prisma/client';

export const roles: Role[] = [
  {
    id: 0,
    name: 'Admin',
    description:
      'Can create and manage stores, and can manage users and store settings, products and items for any store',
  },
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
