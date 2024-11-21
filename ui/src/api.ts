/**
 * STORES
 */
export type TStore = {
  id: string;
  name: string;
  website?: string;
  description: string;
  image?: string;
  heroImage?: string;
};

const stores: TStore[] = [
  {
    id: 'a6539fe2-60cd-4da3-949c-a608fb1736a1',
    name: 'Carroll Magnet Middle School Theatre Company',
    website: 'https://www.cmmstheatre.com/',
    description:
      'Carroll Magnet Middle School Theatre Company is a group of students who love to perform and create theatre. We are a part of Carroll Magnet Middle School in Raleigh, NC.',
    image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
  },
];

export const getStores = async (): Promise<{ stores: TStore[] }> => {
  return { stores };
};

export const getStore = async (storeId: string): Promise<{ store: TStore | undefined }> => {
  return {
    store: stores.find((store) => store.id === storeId),
  };
};

/**
 * PRODUCTS
 */
export type TProduct = {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  image?: string;
};

const products: { [k: string]: TProduct[] } = {
  'a6539fe2-60cd-4da3-949c-a608fb1736a1': [
    {
      id: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
      storeId: 'a6539fe2-60cd-4da3-949c-a608fb1736a1',
      name: 'High School Musical Jr. Admission',
      description:
        'Admission to the Carroll Magnet Middle School Theatre Company production of High School Musical Jr.',
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/editor/hsm-graphic.jpg?1730155750',
    },
    {
      id: '587e3cf9-cd2e-4bfb-a593-fd42c5545fab',
      storeId: 'a6539fe2-60cd-4da3-949c-a608fb1736a1',
      name: 'CMMS Theatre Program Fee',
      description: 'One-time program fee for participation in the Carroll Magnet Middle School Theatre Company.',
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
    },
    {
      id: 'eb1266bf-20aa-491c-a60e-9c9898588097',
      storeId: 'a6539fe2-60cd-4da3-949c-a608fb1736a1',
      name: 'CMMS Theatre Donations',
      description: 'Donations to the Carroll Magnet Middle School Theatre Company to support our productions.',
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
    },
  ],
};

export const getProducts = async (storeId: string): Promise<{ products: TProduct[] }> => {
  return { products: products[storeId] };
};

export const getProduct = async (productId: string): Promise<{ product: TProduct | undefined }> => {
  return {
    product: Object.values(products).reduce(
      (acc, product) => {
        acc = product.find((p) => p.id === productId);
        return acc;
      },
      undefined as TProduct | undefined,
    ),
  };
};

/**
 * ITEMS
 */
export enum DisplayItemType {
  TICKET = 'ticket',
  MERCHANDISE = 'merchandise',
  DONATION = 'donation',
}

export type TDisplayItem = TDisplayDonationItem | TDisplayMerchandiseItem | TDisplayTicketItem;

export type TDisplayTicketItem = {
  id: string;
  productId: string;
  product: Pick<TProduct, 'name'>;
  itemType: DisplayItemType.TICKET;
  name: string;
  description?: string;
  price: number;
  image?: string;
  maxQuantityPerOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type TDisplayMerchandiseItem = {
  id: string;
  productId: string;
  product: Pick<TProduct, 'name'>;
  itemType: DisplayItemType.MERCHANDISE;
  name: string;
  description?: string;
  price: number;
  image?: string;
  maxQuantityPerOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type TDisplayDonationItem = {
  id: string;
  productId: string;
  product: Pick<TProduct, 'name'>;
  itemType: DisplayItemType.DONATION;
  name: string;
  description?: string;
  image?: string;
  maxQuantityPerOrder: number;
  amountMin: number;
  amountMax: number;
  presetAmounts: number[];
  createdAt: string;
  updatedAt: string;
};

const items: { [k: string]: TDisplayItem[] } = {
  'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3': [
    {
      id: '2ca926f4-25a4-4c1c-806d-7903d12ba4cd',
      productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
      product: {
        name: 'High School Musical Jr. Admission',
      },
      itemType: 'ticket',
      name: 'General Admission - Night 1',
      description: 'General Admission ticket for the first night of High School Musical Jr.',
      price: 10,
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
      maxQuantityPerOrder: 10,
    } as TDisplayTicketItem,
    {
      id: '82c5c617-b23a-44b6-b898-bbcd7d867bb1',
      productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
      product: {
        name: 'High School Musical Jr. Admission',
      },
      itemType: 'ticket',
      name: 'General Admission - Night 2',
      description: 'General Admission ticket for the second night of High School Musical Jr.',
      price: 10,
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
      maxQuantityPerOrder: 10,
    } as TDisplayTicketItem,
    {
      id: '8a100792-62c8-489d-9dd7-0cd05b45ea87',
      productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
      product: {
        name: 'High School Musical Jr. Admission',
      },
      itemType: 'ticket',
      name: 'General Admission - Night 3',
      description: 'General Admission ticket for the last night of High School Musical Jr.',
      price: 10,
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
      maxQuantityPerOrder: 10,
    } as TDisplayTicketItem,
    {
      id: '24fdb139-0e35-4f8a-a385-66d7aec81fa2',
      productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
      product: {
        name: 'High School Musical Jr. Admission',
      },
      itemType: 'ticket',
      name: 'Child/Student Admission - Night 1',
      description: 'Child/Student Admission ticket for the first night of High School Musical Jr.',
      price: 5,
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
      maxQuantityPerOrder: 10,
    } as TDisplayTicketItem,
    {
      id: '68543c72-df74-43cb-a41a-8882d5e960f1',
      productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
      product: {
        name: 'High School Musical Jr. Admission',
      },
      itemType: 'ticket',
      name: 'Child/Student Admission - Night 2',
      description: 'Child/Student ticket for the second night of High School Musical Jr.',
      price: 5,
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
      maxQuantityPerOrder: 10,
    } as TDisplayTicketItem,
    {
      id: 'f53ec257-2f46-413e-a91d-df3a2efc6648',
      productId: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
      product: {
        name: 'High School Musical Jr. Admission',
      },
      itemType: 'ticket',
      name: 'Child/Student Admission - Night 3',
      description: 'Child/Student Admission ticket for the last night of High School Musical Jr.',
      price: 5,
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
      maxQuantityPerOrder: 10,
    } as TDisplayTicketItem,
  ],
  '587e3cf9-cd2e-4bfb-a593-fd42c5545fab': [
    {
      id: 'f53ec257-2f46-413e-a91d-df3a2efc6658',
      productId: '587e3cf9-cd2e-4bfb-a593-fd42c5545fab',
      product: {
        name: 'CMMS Theatre Program Fee',
      },
      itemType: 'merchandise',
      name: 'Student Program Fee',
      description: 'One-time program fee for participation in the Carroll Magnet Middle School Theatre Company.',
      price: 150,
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
      maxQuantityPerOrder: 1,
    } as TDisplayMerchandiseItem,
    {
      id: 'af92a383-7bc7-4dba-ae19-06a401ef73fe',
      productId: '587e3cf9-cd2e-4bfb-a593-fd42c5545fab',
      product: {
        name: 'CMMS Theatre Program Fee',
      },
      itemType: 'merchandise',
      name: 'Student Program Fee - Donation',
      description: 'Donate a program fee to help cover for kids in need.',
      price: 150,
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
      maxQuantityPerOrder: 10,
    } as TDisplayMerchandiseItem,
  ],
  'eb1266bf-20aa-491c-a60e-9c9898588097': [
    {
      id: 'af638f78-ab9f-44ec-844e-03995aba66c7',
      productId: 'eb1266bf-20aa-491c-a60e-9c9898588097',
      product: {
        name: 'CMMS Theatre Donations',
      },
      itemType: 'donation',
      name: 'Donate to cover ticket costs for students in need',
      description: 'Donate to cover ticket costs for students in need',
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
      amountMin: 1,
      amountMax: 999,
      presetAmounts: [1, 5, 10, 25, 50, 100],
    } as TDisplayDonationItem,
  ],
};

export const getItems = async (productId: string): Promise<{ items: TDisplayItem[] }> => {
  return { items: items[productId] };
};

export const getItem = async (itemId: string): Promise<{ item: TDisplayItem | undefined }> => {
  return {
    item: Object.values(items).reduce(
      (acc, item) => {
        acc = item.find((i) => i.id === itemId);
        return acc;
      },
      undefined as TDisplayItem | undefined,
    ),
  };
};

/**
 * USERS
 */
export type TUser = {
  id: string;
  name: string;
  email: string;
  storeId: string;
  roleId: number;
  role: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

const users: TUser[] = [
  {
    id: '24193623-07f1-4c5c-835f-465e67baee84',
    name: 'Daunte Carter',
    email: 'daunte.carter@email.com',
    storeId: 'a6539fe2-60cd-4da3-949c-a608fb1736a1',
    roleId: 2,
    role: {
      name: 'Owner',
    },
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
  },
  {
    id: 'e086ae45-79fa-482c-aea8-f1f3f9813b8a',
    name: 'Danisha Walker',
    email: 'danisha.walker@email.com',
    storeId: 'a6539fe2-60cd-4da3-949c-a608fb1736a1',
    roleId: 3,
    role: {
      name: 'Manager',
    },
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
  },
  {
    id: '33ff980e-14fe-4da8-a33d-b09e0df98768',
    name: 'Octavia Galloway',
    email: 'octavia.galloway@email.com',
    storeId: 'a6539fe2-60cd-4da3-949c-a608fb1736a1',
    roleId: 3,
    role: {
      name: 'Manager',
    },
    createdAt: '2024-11-18T00:00:00.000Z',
    updatedAt: '2024-11-18T00:00:00.000Z',
  },
];

export const getUsers = async (): Promise<{ users: TUser[] }> => {
  return {
    users,
  };
};

export const getUser = async (userId: string): Promise<{ user: TUser | undefined }> => {
  return {
    user: users.find((user) => user.id === userId),
  };
};
