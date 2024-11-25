import z from 'zod';
import { empty, page, uuid } from '../_presets';

export const listStoresDashboardSchema = {
  body: empty,
  params: empty,
  query: z
    .object({
      page: page,
    })
    .strict(),
};

export const getStoreTeamDashboardSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: z
    .object({
      page: page,
    })
    .strict(),
};

export const getStoreDashboardSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: empty,
};

export const updateStoreDashboardSchema = {
  body: empty,
  params: z
    .object({
      storeId: uuid,
    })
    .strict(),
  query: empty,
};
