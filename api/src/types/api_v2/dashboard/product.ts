import { z } from 'zod';
import * as productSchema from '../../../schemas_v2/dashboard/product';

export type CreateProductDashboardBody = z.infer<typeof productSchema.createProductDashboardSchema.body>;
export type CreateProductDashboardParams = z.infer<typeof productSchema.createProductDashboardSchema.params>;
export type CreateProductDashboardQuery = z.infer<typeof productSchema.createProductDashboardSchema.query>;

export type ListProductsDashboardBody = z.infer<typeof productSchema.listProductsDashboardSchema.body>;
export type ListProductsDashboardParams = z.infer<typeof productSchema.listProductsDashboardSchema.params>;
export type ListProductsDashboardQuery = z.infer<typeof productSchema.listProductsDashboardSchema.query>;

export type GetProductDashboardBody = z.infer<typeof productSchema.getProductDashboardSchema.body>;
export type GetProductDashboardParams = z.infer<typeof productSchema.getProductDashboardSchema.params>;
export type GetProductDashboardQuery = z.infer<typeof productSchema.getProductDashboardSchema.query>;

export type UpdateProductDashboardBody = z.infer<typeof productSchema.updateProductDashboardSchema.body>;
export type UpdateProductDashboardParams = z.infer<typeof productSchema.updateProductDashboardSchema.params>;
export type UpdateProductDashboardQuery = z.infer<typeof productSchema.updateProductDashboardSchema.query>;

export type DeleteProductDashboardBody = z.infer<typeof productSchema.deleteProductDashboardSchema.body>;
export type DeleteProductDashboardParams = z.infer<typeof productSchema.deleteProductDashboardSchema.params>;
export type DeleteProductDashboardQuery = z.infer<typeof productSchema.deleteProductDashboardSchema.query>;
