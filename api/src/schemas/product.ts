import { bool, empty, obj, strLong, strShort, uuid } from './_presets';

export const createProductSchema = {
  body: obj({
    name: strShort,
    description: strLong.optional(),
  }),
  params: empty,
  query: empty,
};

export const deleteProductSchema = {
  body: empty,
  params: obj({
    storeId: uuid,
    productId: uuid,
  }),
  query: empty,
};

export const getProductPublicSchema = {
  body: empty,
  params: obj({
    storeId: uuid,
    productId: uuid,
  }),
  query: empty,
};

export const getProductPrivateSchema = {
  body: empty,
  params: obj({
    storeId: uuid,
    productId: uuid,
  }),
  query: empty,
};

export const listProductsPublicSchema = {
  body: empty,
  params: obj({
    storeId: uuid,
  }),
  query: empty,
};

export const listProductsPrivateSchema = {
  body: empty,
  params: obj({
    storeId: uuid,
  }),
  query: obj({
    isAvailable: bool.optional(),
  }),
};

export const updateProductSchema = {
  body: obj({
    name: strShort.optional(),
    description: strLong.optional(),
  }),
  params: obj({
    storeId: uuid,
    productId: uuid,
  }),
  query: empty,
};
