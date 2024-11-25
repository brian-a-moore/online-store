import { z } from 'zod';
import * as publicSchema from '../../../schemas/public';

export type ListStoresPublicBody = z.infer<typeof publicSchema.listStoresPublicSchema.body>;
export type ListStoresPublicParams = z.infer<typeof publicSchema.listStoresPublicSchema.params>;
export type ListStoresPublicQuery = z.infer<typeof publicSchema.listStoresPublicSchema.query>;

export type GetStorePublicBody = z.infer<typeof publicSchema.getStorePublicSchema.body>;
export type GetStorePublicParams = z.infer<typeof publicSchema.getStorePublicSchema.params>;
export type GetStorePublicQuery = z.infer<typeof publicSchema.getStorePublicSchema.query>;

export type ListProductsPublicBody = z.infer<typeof publicSchema.listProductsPublicSchema.body>;
export type ListProductsPublicParams = z.infer<typeof publicSchema.listProductsPublicSchema.params>;
export type ListProductsPublicQuery = z.infer<typeof publicSchema.listProductsPublicSchema.query>;

export type GetProductPublicBody = z.infer<typeof publicSchema.getProductPublicSchema.body>;
export type GetProductPublicParams = z.infer<typeof publicSchema.getProductPublicSchema.params>;
export type GetProductPublicQuery = z.infer<typeof publicSchema.getProductPublicSchema.query>;

export type ListItemsPublicBody = z.infer<typeof publicSchema.listItemsPublicSchema.body>;
export type ListItemsPublicParams = z.infer<typeof publicSchema.listItemsPublicSchema.params>;
export type ListItemsPublicQuery = z.infer<typeof publicSchema.listItemsPublicSchema.query>;
