import { ItemType, Role } from '@prisma/client';

export const itemTypes: ItemType[] = [
  {
    id: 1,
    name: 'Fixed',
    description: 'An item with a fixed unit price',
  },
  {
    id: 2,
    name: 'Variable',
    description: 'An item with variable and/or pre-set prices, such as a donation',
  },
];

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
