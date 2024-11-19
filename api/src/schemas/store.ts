import { bool, empty, obj, strLong, strShort } from './_presets';

export const createStoreSchema = {
  body: obj({
    name: strShort,
    description: strLong.optional(),
    website: strShort.optional(),
  }),
  params: empty,
  query: empty,
};

export const deleteStoreSchema = {
  body: empty,
  params: obj({
    storeId: bool,
  }),
  query: empty,
};

export const getStorePublicSchema = {
  body: empty,
  params: obj({
    storeId: bool,
  }),
  query: empty,
};

export const getStorePrivateSchema = {
  body: empty,
  params: obj({
    storeId: bool,
  }),
  query: empty,
};

export const listStoresPublicSchema = {
  body: empty,
  params: empty,
  query: empty,
};

export const listStoresPrivateSchema = {
  body: empty,
  params: empty,
  query: empty,
};

export const updateStoreSchema = {
  body: obj({
    name: strShort.optional(),
    description: strLong.optional(),
    website: strShort.optional(),
  }),
  params: obj({
    storeId: bool,
  }),
  query: empty,
};
