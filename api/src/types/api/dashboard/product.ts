import { z } from 'zod';
import * as productSchema from '../../../schemas/dashboard/product';

export type CreateProductDashboardBody = z.infer<typeof productSchema.createProductDashboardSchema.body>;
export type CreateProductDashboardParams = z.infer<typeof productSchema.createProductDashboardSchema.params>;
export type CreateProductDashboardQuery = z.infer<typeof productSchema.createProductDashboardSchema.query>;
export type CreateProductDashboardResponse = { id: string };

export type ListProductsDashboardBody = z.infer<typeof productSchema.listProductsDashboardSchema.body>;
export type ListProductsDashboardParams = z.infer<typeof productSchema.listProductsDashboardSchema.params>;
export type ListProductsDashboardQuery = z.infer<typeof productSchema.listProductsDashboardSchema.query>;
export type ListProductsDashboardResponse = {
  products: {
    name: string;
    id: string;
    isPublished: boolean;
    updatedAt: Date;
  }[];
};

export type GetProductDashboardBody = z.infer<typeof productSchema.getProductDashboardSchema.body>;
export type GetProductDashboardParams = z.infer<typeof productSchema.getProductDashboardSchema.params>;
export type GetProductDashboardQuery = z.infer<typeof productSchema.getProductDashboardSchema.query>;
export type GetProductDashboardResponse = {
  product: {
    name: string;
    description: string | null;
    storeId: string;
    id: string;
    image: string | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type UpdateProductDashboardBody = z.infer<typeof productSchema.updateProductDashboardSchema.body>;
export type UpdateProductDashboardParams = z.infer<typeof productSchema.updateProductDashboardSchema.params>;
export type UpdateProductDashboardQuery = z.infer<typeof productSchema.updateProductDashboardSchema.query>;
export type UpdateProductDashboardResponse = never;

export type DeleteProductDashboardBody = z.infer<typeof productSchema.deleteProductDashboardSchema.body>;
export type DeleteProductDashboardParams = z.infer<typeof productSchema.deleteProductDashboardSchema.params>;
export type DeleteProductDashboardQuery = z.infer<typeof productSchema.deleteProductDashboardSchema.query>;
export type DeleteProductDashboardResponse = never;
