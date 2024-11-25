import { z } from 'zod';
import * as adminProductSchemas from '../../../schemas_v2/admin/product';

export type ListProductsAdminBody = z.infer<typeof adminProductSchemas.listProductsAdminSchema>['body'];
export type ListProductsAdminParams = z.infer<typeof adminProductSchemas.listProductsAdminSchema>['params'];
export type ListProductsAdminQuery = z.infer<typeof adminProductSchemas.listProductsAdminSchema>['query'];

export type GetProductAdminBody = z.infer<typeof adminProductSchemas.getProductAdminSchema>['body'];
export type GetProductAdminParams = z.infer<typeof adminProductSchemas.getProductAdminSchema>['params'];
export type GetProductAdminQuery = z.infer<typeof adminProductSchemas.getProductAdminSchema>['query'];

export type UpdateProductAdminBody = z.infer<typeof adminProductSchemas.updateProductAdminSchema>['body'];
export type UpdateProductAdminParams = z.infer<typeof adminProductSchemas.updateProductAdminSchema>['params'];
export type UpdateProductAdminQuery = z.infer<typeof adminProductSchemas.updateProductAdminSchema>['query'];

export type DeleteProductAdminBody = z.infer<typeof adminProductSchemas.deleteProductAdminSchema>['body'];
export type DeleteProductAdminParams = z.infer<typeof adminProductSchemas.deleteProductAdminSchema>['params'];
export type DeleteProductAdminQuery = z.infer<typeof adminProductSchemas.deleteProductAdminSchema>['query'];
