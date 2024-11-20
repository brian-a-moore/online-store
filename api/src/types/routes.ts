import { z } from 'zod';

// AUTH ROUTES
import * as authSchema from '../schemas/auth';

export type AuthLoginBody = z.infer<(typeof authSchema.authLoginSchema)['body']>;
export type AuthLoginParams = z.infer<(typeof authSchema.authLoginSchema)['params']>;
export type AuthLoginQuery = z.infer<(typeof authSchema.authLoginSchema)['query']>;

export type AuthVerifyTokenBody = z.infer<(typeof authSchema.authVerifyTokenSchema)['body']>;
export type AuthVerifyTokenParams = z.infer<(typeof authSchema.authVerifyTokenSchema)['params']>;
export type AuthVerifyTokenQuery = z.infer<(typeof authSchema.authVerifyTokenSchema)['query']>;

// ITEM ROUTES
import * as itemSchema from '../schemas/item';

export type CreateItemBody = z.infer<(typeof itemSchema.createItemSchema)['body']>;
export type CreateItemParams = z.infer<(typeof itemSchema.createItemSchema)['params']>;
export type CreateItemQuery = z.infer<(typeof itemSchema.createItemSchema)['query']>;

export type DeleteItemBody = z.infer<(typeof itemSchema.deleteItemSchema)['body']>;
export type DeleteItemParams = z.infer<(typeof itemSchema.deleteItemSchema)['params']>;
export type DeleteItemQuery = z.infer<(typeof itemSchema.deleteItemSchema)['query']>;

export type GetItemBody = z.infer<(typeof itemSchema.getItemSchema)['body']>;
export type GetItemParams = z.infer<(typeof itemSchema.getItemSchema)['params']>;
export type GetItemQuery = z.infer<(typeof itemSchema.getItemSchema)['query']>;

export type ListItemsPublicBody = z.infer<(typeof itemSchema.listItemsPublicSchema)['body']>;
export type ListItemsPublicParams = z.infer<(typeof itemSchema.listItemsPublicSchema)['params']>;
export type ListItemsPublicQuery = z.infer<(typeof itemSchema.listItemsPublicSchema)['query']>;

export type ListItemsPrivateBody = z.infer<(typeof itemSchema.listItemsPrivateSchema)['body']>;
export type ListItemsPrivateParams = z.infer<(typeof itemSchema.listItemsPrivateSchema)['params']>;
export type ListItemsPrivateQuery = z.infer<(typeof itemSchema.listItemsPrivateSchema)['query']>;

export type UpdateItemBody = z.infer<(typeof itemSchema.updateItemSchema)['body']>;
export type UpdateItemParams = z.infer<(typeof itemSchema.updateItemSchema)['params']>;
export type UpdateItemQuery = z.infer<(typeof itemSchema.updateItemSchema)['query']>;

// ORDER ROUTES
import * as orderSchema from '../schemas/order';

export type CreateCheckoutSessionBody = z.infer<(typeof orderSchema.createCheckoutSessionSchema)['body']>;
export type CreateCheckoutSessionParams = z.infer<(typeof orderSchema.createCheckoutSessionSchema)['params']>;
export type CreateCheckoutSessionQuery = z.infer<(typeof orderSchema.createCheckoutSessionSchema)['query']>;

// PRODUCT ROUTES
import * as productSchema from '../schemas/product';

export type CreateProductBody = z.infer<(typeof productSchema.createProductSchema)['body']>;
export type CreateProductParams = z.infer<(typeof productSchema.createProductSchema)['params']>;
export type CreateProductQuery = z.infer<(typeof productSchema.createProductSchema)['query']>;

export type DeleteProductBody = z.infer<(typeof productSchema.deleteProductSchema)['body']>;
export type DeleteProductParams = z.infer<(typeof productSchema.deleteProductSchema)['params']>;
export type DeleteProductQuery = z.infer<(typeof productSchema.deleteProductSchema)['query']>;

export type GetProductPublicBody = z.infer<(typeof productSchema.getProductPublicSchema)['body']>;
export type GetProductPublicParams = z.infer<(typeof productSchema.getProductPublicSchema)['params']>;
export type GetProductPublicQuery = z.infer<(typeof productSchema.getProductPublicSchema)['query']>;

export type GetProductPrivateBody = z.infer<(typeof productSchema.getProductPrivateSchema)['body']>;
export type GetProductPrivateParams = z.infer<(typeof productSchema.getProductPrivateSchema)['params']>;
export type GetProductPrivateQuery = z.infer<(typeof productSchema.getProductPrivateSchema)['query']>;

export type ListProductsPublicBody = z.infer<(typeof productSchema.listProductsPublicSchema)['body']>;
export type ListProductsPublicParams = z.infer<(typeof productSchema.listProductsPublicSchema)['params']>;
export type ListProductsPublicQuery = z.infer<(typeof productSchema.listProductsPublicSchema)['query']>;

export type ListProductsPrivateBody = z.infer<(typeof productSchema.listProductsPrivateSchema)['body']>;
export type ListProductsPrivateParams = z.infer<(typeof productSchema.listProductsPrivateSchema)['params']>;
export type ListProductsPrivateQuery = z.infer<(typeof productSchema.listProductsPrivateSchema)['query']>;

export type UpdateProductBody = z.infer<(typeof productSchema.updateProductSchema)['body']>;
export type UpdateProductParams = z.infer<(typeof productSchema.updateProductSchema)['params']>;
export type UpdateProductQuery = z.infer<(typeof productSchema.updateProductSchema)['query']>;

// STORE ROUTES
import * as storeSchema from '../schemas/store';

export type CreateStoreBody = z.infer<(typeof storeSchema.createStoreSchema)['body']>;
export type CreateStoreParams = z.infer<(typeof storeSchema.createStoreSchema)['params']>;
export type CreateStoreQuery = z.infer<(typeof storeSchema.createStoreSchema)['query']>;

export type DeleteStoreBody = z.infer<(typeof storeSchema.deleteStoreSchema)['body']>;
export type DeleteStoreParams = z.infer<(typeof storeSchema.deleteStoreSchema)['params']>;
export type DeleteStoreQuery = z.infer<(typeof storeSchema.deleteStoreSchema)['query']>;

export type GetStorePublicBody = z.infer<(typeof storeSchema.getStorePublicSchema)['body']>;
export type GetStorePublicParams = z.infer<(typeof storeSchema.getStorePublicSchema)['params']>;
export type GetStorePublicQuery = z.infer<(typeof storeSchema.getStorePublicSchema)['query']>;

export type GetStorePrivateBody = z.infer<(typeof storeSchema.getStorePrivateSchema)['body']>;
export type GetStorePrivateParams = z.infer<(typeof storeSchema.getStorePrivateSchema)['params']>;
export type GetStorePrivateQuery = z.infer<(typeof storeSchema.getStorePrivateSchema)['query']>;

export type ListStoresPublicBody = z.infer<(typeof storeSchema.listStoresPublicSchema)['body']>;
export type ListStoresPublicParams = z.infer<(typeof storeSchema.listStoresPublicSchema)['params']>;
export type ListStoresPublicQuery = z.infer<(typeof storeSchema.listStoresPublicSchema)['query']>;

export type ListStoresPrivateBody = z.infer<(typeof storeSchema.listStoresPrivateSchema)['body']>;
export type ListStoresPrivateParams = z.infer<(typeof storeSchema.listStoresPrivateSchema)['params']>;
export type ListStoresPrivateQuery = z.infer<(typeof storeSchema.listStoresPrivateSchema)['query']>;

export type UpdateStoreBody = z.infer<(typeof storeSchema.updateStoreSchema)['body']>;
export type UpdateStoreParams = z.infer<(typeof storeSchema.updateStoreSchema)['params']>;
export type UpdateStoreQuery = z.infer<(typeof storeSchema.updateStoreSchema)['query']>;

// USER ROUTES
import * as userSchema from '../schemas/user';

export type CreateUserBody = z.infer<(typeof userSchema.createUserSchema)['body']>;
export type CreateUserParams = z.infer<(typeof userSchema.createUserSchema)['params']>;
export type CreateUserQuery = z.infer<(typeof userSchema.createUserSchema)['query']>;

export type DeleteUserBody = z.infer<(typeof userSchema.deleteUserSchema)['body']>;
export type DeleteUserParams = z.infer<(typeof userSchema.deleteUserSchema)['params']>;
export type DeleteUserQuery = z.infer<(typeof userSchema.deleteUserSchema)['query']>;

export type GetUserBody = z.infer<(typeof userSchema.getUserSchema)['body']>;
export type GetUserParams = z.infer<(typeof userSchema.getUserSchema)['params']>;
export type GetUserQuery = z.infer<(typeof userSchema.getUserSchema)['query']>;

export type ListUsersBody = z.infer<(typeof userSchema.listUsersSchema)['body']>;
export type ListUsersParams = z.infer<(typeof userSchema.listUsersSchema)['params']>;
export type ListUsersQuery = z.infer<(typeof userSchema.listUsersSchema)['query']>;

export type UpdateUserBody = z.infer<(typeof userSchema.updateUserSchema)['body']>;
export type UpdateUserParams = z.infer<(typeof userSchema.updateUserSchema)['params']>;
export type UpdateUserQuery = z.infer<(typeof userSchema.updateUserSchema)['query']>;
