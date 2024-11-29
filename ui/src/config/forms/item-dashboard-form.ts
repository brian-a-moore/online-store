import { z } from 'zod';
import { FixedItemConfig, VariableItemConfig } from '../../../../api/src/types/itemConfigs';

export type FixedItemDashboardFormType = {
  name: string;
  description?: string;
  itemTypeId: 1;
  config: FixedItemConfig;
  maxQuantityPerOrder: number;
  isPublished: boolean;
};

export type VariableItemDashboardFormType = {
  name: string;
  description?: string;
  itemTypeId: 2;
  config: VariableItemConfig;
  maxQuantityPerOrder: number;
  isPublished: boolean;
};

export const DEFAULT_FORM_VALUES_FIXED: FixedItemDashboardFormType = {
  name: '',
  description: '',
  itemTypeId: 1,
  config: {
    isRedeemable: false,
    redeemByDate: '',
    price: 0,
  },
  maxQuantityPerOrder: 10,
  isPublished: false,
};

export const DEFAULT_FORM_VALUES_VARIABLE: VariableItemDashboardFormType = {
  name: '',
  description: '',
  itemTypeId: 2,
  config: {
    defaultAmount: 1,
    minAmount: 1,
    maxAmount: 999999,
    presetAmounts: [],
  },
  maxQuantityPerOrder: 10,
  isPublished: false,
};

export const fixedItemDashboardFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    config: z
      .object({
        isRedeemable: z.boolean(),
        redeemByDate: z.string().optional(),
        price: z.number().positive().min(1).max(999999),
      })
      .strict(),
    isPublished: z.boolean(),
    maxQuantityPerOrder: z.number().int().positive().min(1).max(999),
  })
  .strict();

export const variableItemDashboardFormSchema = z
  .object({
    name: z.string().min(1).max(256),
    description: z.string().min(0).max(2048),
    config: z
      .object({
        defaultAmount: z.number().positive().min(1).max(999999).or(z.literal(0)),
        minAmount: z.number().int().positive(),
        maxAmount: z.number().positive().min(1).max(999999),
        presetAmounts: z.array(z.number().positive().min(1).max(999999)).min(0).max(5),
      })
      .strict(),
    isPublished: z.boolean(),
    maxQuantityPerOrder: z.number().int().positive().min(1).max(999),
  })
  .strict();
