// A store that sells products
export type TStore = {
  storeId: number;
  storeName: string;
  storeWebsite?: string;
  storeDescription: string;
  storeHeroImage: string;
};

// A collection of related items
export type TProduct = {
  productId: number;
  productName: string;
  productDescription: string;
  totalAvailable: number;
};

// A specific item that can be purchased
export type TItem = {
  itemId: number;
  productId: number;
  product: Pick<TProduct, 'productName'>;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemImage: string;
  maxQuantityPerOrder: number;
};

export const getStores = async (): Promise<{ stores: TStore[] }> => {
  return {
    stores: [
      {
        storeId: 1,
        storeName: 'Carroll Magnet Middle School Theatre Company',
        storeWebsite: 'https://www.cmmstheatre.com/',
        storeDescription:
          'Carroll Magnet Middle School Theatre Company is a group of students who love to perform and create theatre. We are a part of Carroll Magnet Middle School in Raleigh, NC.',
        storeHeroImage: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
      },
    ],
  };
};

export const getProducts = async (
  storeId: string,
): Promise<{
  products: TProduct[];
}> => {
  console.log({ storeId });
  return {
    products: [
      {
        productId: 1,
        productName: 'High School Musical Jr. Admission',
        productDescription:
          'Admission to the Carroll Magnet Middle School Theatre Company production of High School Musical Jr.',
        totalAvailable: 500,
      },
    ],
  };
};

export const getItems = async (productId: string): Promise<{ items: TItem[] }> => {
  console.log({ productId });
  return {
    items: [
      {
        itemId: 1,
        productId: 1,
        product: {
          productName: 'High School Musical Jr. Admission',
        },
        itemName: 'General Admission - Night 1',
        itemDescription: 'General Admission ticket for the first night of High School Musical Jr.',
        itemPrice: 10,
        itemImage: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
        maxQuantityPerOrder: 10,
      },
      {
        itemId: 2,
        productId: 1,
        product: {
          productName: 'High School Musical Jr. Admission',
        },
        itemName: 'General Admission - Night 2',
        itemDescription: 'General Admission ticket for the second night of High School Musical Jr.',
        itemPrice: 10,
        itemImage: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
        maxQuantityPerOrder: 10,
      },
      {
        itemId: 3,
        productId: 1,
        product: {
          productName: 'High School Musical Jr. Admission',
        },
        itemName: 'General Admission - Night 3',
        itemDescription: 'General Admission ticket for the last night of High School Musical Jr.',
        itemPrice: 10,
        itemImage: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
        maxQuantityPerOrder: 10,
      },
      {
        itemId: 4,
        productId: 1,
        product: {
          productName: 'High School Musical Jr. Admission',
        },
        itemName: 'Child/Student Admission - Night 1',
        itemDescription: 'Child/Student Admission ticket for the first night of High School Musical Jr.',
        itemPrice: 5,
        itemImage: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
        maxQuantityPerOrder: 10,
      },
      {
        itemId: 5,
        productId: 1,
        product: {
          productName: 'High School Musical Jr. Admission',
        },
        itemName: 'Child/Student Admission - Night 2',
        itemDescription: 'Child/Student ticket for the second night of High School Musical Jr.',
        itemPrice: 5,
        itemImage: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
        maxQuantityPerOrder: 10,
      },
      {
        itemId: 6,
        productId: 1,
        product: {
          productName: 'High School Musical Jr. Admission',
        },
        itemName: 'Child/Student Admission - Night 3',
        itemDescription: 'Child/Student Admission ticket for the last night of High School Musical Jr.',
        itemPrice: 5,
        itemImage: 'https://www.cmmstheatre.com/uploads/3/8/8/3/38832803/ctc-header_orig.png',
        maxQuantityPerOrder: 10,
      },
    ],
  };
};
