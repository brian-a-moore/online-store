import { z } from 'zod';
import * as publicSchema from '../../../schemas/public';

type JsonValue = string | any;

export type ListStoresPublicBody = z.infer<typeof publicSchema.listStoresPublicSchema.body>;
export type ListStoresPublicParams = z.infer<typeof publicSchema.listStoresPublicSchema.params>;
export type ListStoresPublicQuery = z.infer<typeof publicSchema.listStoresPublicSchema.query>;
export type ListStoresPublicResponse = {
  stores: {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    updatedAt: Date;
  }[];
};

export type GetStorePublicBody = z.infer<typeof publicSchema.getStorePublicSchema.body>;
export type GetStorePublicParams = z.infer<typeof publicSchema.getStorePublicSchema.params>;
export type GetStorePublicQuery = z.infer<typeof publicSchema.getStorePublicSchema.query>;
export type GetStorePublicResponse = {
  store: {
    id: string;
    name: string;
    website: string | null;
    description: string | null;
    image: string | null;
  };
};

export type ListProductsPublicBody = z.infer<typeof publicSchema.listProductsPublicSchema.body>;
export type ListProductsPublicParams = z.infer<typeof publicSchema.listProductsPublicSchema.params>;
export type ListProductsPublicQuery = z.infer<typeof publicSchema.listProductsPublicSchema.query>;
export type ListProductsPublicResponse = {
  products: {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
  }[];
};

export type GetProductPublicBody = z.infer<typeof publicSchema.getProductPublicSchema.body>;
export type GetProductPublicParams = z.infer<typeof publicSchema.getProductPublicSchema.params>;
export type GetProductPublicQuery = z.infer<typeof publicSchema.getProductPublicSchema.query>;
export type GetProductPublicResponse = {
  product: {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
  };
};

export type ListItemsPublicBody = z.infer<typeof publicSchema.listItemsPublicSchema.body>;
export type ListItemsPublicParams = z.infer<typeof publicSchema.listItemsPublicSchema.params>;
export type ListItemsPublicQuery = z.infer<typeof publicSchema.listItemsPublicSchema.query>;
export type ListItemsPublicResponse = {
  items: {
    id: string;
    name: string;
    description: string | null;
    image: string | null;
    product: {
      name: string;
    };
    itemTypeId: number;
    maxQuantityPerOrder: number;
    config: JsonValue;
  }[];
};
