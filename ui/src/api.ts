// A store that sells products
export type TStore = {
  id: string;
  name: string;
  website?: string;
  description: string;
  image?: string;
  heroImage?: string;
};

// A collection of related items
export type TProduct = {
  id: string;
  storeId: string;
  name: string;
  description?: string;
  image?: string;
};

type TDisplayItem = TDisplayDonationItem | TDisplayMerchandiseItem | TDisplayTicketItem;

type TDisplayTicketItem = {
  id: string;
  productId: string;
  product: Pick<TProduct, 'name'>;
  name: string;
  description?: string;
  price: number;
  image?: string;
  maxQuantityPerOrder: number;
  createdAt: string;
  updatedAt: string;
};

type TDisplayMerchandiseItem = {
  id: string;
  productId: string;
  product: Pick<TProduct, 'name'>;
  name: string;
  description?: string;
  price: number;
  image?: string;
  maxQuantityPerOrder: number;
  createdAt: string;
  updatedAt: string;
};

type TDisplayDonationItem = {
  id: string;
  productId: string;
  product: Pick<TProduct, 'name'>;
  name: string;
  description?: string;
  image?: string;
  maxQuantityPerOrder: number;
  customAmount?: {
    min: number;
    max: number;
  };
  presetAmounts?: number[];
  createdAt: string;
  updatedAt: string;
};

export const getStores = async (): Promise<{ stores: TStore[] }> => {
  return {
    stores: [
      {
        id: 'a6539fe2-60cd-4da3-949c-a608fb1736a1',
        name: 'Carroll Magnet Middle School Theatre Company',
        website: 'https://www.cmmstheatre.com/',
        description:
          'Carroll Magnet Middle School Theatre Company is a group of students who love to perform and create theatre. We are a part of Carroll Magnet Middle School in Raleigh, NC.',
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
      },
    ],
  };
};

export const getStore = async (storeId: string): Promise<{ store: TStore }> => {
  return {
    store: {
      id: storeId,
      name: 'Carroll Magnet Middle School Theatre Company',
      website: 'https://www.cmmstheatre.com/',
      description:
        'Carroll Magnet Middle School Theatre Company is a group of students who love to perform and create theatre. We are a part of Carroll Magnet Middle School in Raleigh, NC.',
      image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
      heroImage: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/2_orig.png',
    },
  };
};

export const getProducts = async (
  storeId: string,
): Promise<{
  products: TProduct[];
}> => {
  return {
    products: [
      {
        id: 'cf395871-f5d8-4aaf-b1ea-8e9ce816a5f3',
        storeId,
        name: 'High School Musical Jr. Admission',
        description:
          'Admission to the Carroll Magnet Middle School Theatre Company production of High School Musical Jr.',
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/editor/hsm-graphic.jpg?1730155750',
      },
    ],
  };
};

export const getItems = async (productId: string): Promise<{ items: TDisplayItem[] }> => {
  return {
    items: [
      {
        id: '2ca926f4-25a4-4c1c-806d-7903d12ba4cd',
        productId,
        product: {
          name: 'High School Musical Jr. Admission',
        },
        name: 'General Admission - Night 1',
        description: 'General Admission ticket for the first night of High School Musical Jr.',
        price: 10,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
      {
        id: '82c5c617-b23a-44b6-b898-bbcd7d867bb1',
        productId,
        product: {
          name: 'High School Musical Jr. Admission',
        },
        name: 'General Admission - Night 2',
        description: 'General Admission ticket for the second night of High School Musical Jr.',
        price: 10,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
      {
        id: '8a100792-62c8-489d-9dd7-0cd05b45ea87',
        productId,
        product: {
          name: 'High School Musical Jr. Admission',
        },
        name: 'General Admission - Night 3',
        description: 'General Admission ticket for the last night of High School Musical Jr.',
        price: 10,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
      {
        id: '24fdb139-0e35-4f8a-a385-66d7aec81fa2',
        productId,
        product: {
          name: 'High School Musical Jr. Admission',
        },
        name: 'Child/Student Admission - Night 1',
        description: 'Child/Student Admission ticket for the first night of High School Musical Jr.',
        price: 5,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
      {
        id: '68543c72-df74-43cb-a41a-8882d5e960f1',
        productId,
        product: {
          name: 'High School Musical Jr. Admission',
        },
        name: 'Child/Student Admission - Night 2',
        description: 'Child/Student ticket for the second night of High School Musical Jr.',
        price: 5,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
      {
        id: 'f53ec257-2f46-413e-a91d-df3a2efc6648',
        productId,
        product: {
          name: 'High School Musical Jr. Admission',
        },
        name: 'Child/Student Admission - Night 3',
        description: 'Child/Student Admission ticket for the last night of High School Musical Jr.',
        price: 5,
        image: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/published/hsm.jpeg?1730151383',
        maxQuantityPerOrder: 10,
      } as TDisplayTicketItem,
    ],
  };
};
