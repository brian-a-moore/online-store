import { z } from 'zod';

export const createItemSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const deleteItemSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const getItemPublicSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const getItemPrivateSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const listItemsPublicSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const listItemsPrivateSchema = {
  body: z.object({}),
  params: z.object({}),
};

export const updateItemSchema = {
  body: z.object({}),
  params: z.object({}),
};
