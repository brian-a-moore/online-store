import { Item } from '@prisma/client';

export type FixedItemConfig = {
  isRedeemable: boolean;
  redeemedAt?: boolean;
  redeemByDate?: string;
  price: string;
};

export type VariableItemConfig = {
  defaultAmount: number;
  minAmount: number;
  maxAmount: number;
  stepAmount: number;
  presetAmounts: number[];
};

export interface FixedItem extends Item {
  config: FixedItemConfig;
}
export interface VariableItem extends Item {
  config: VariableItemConfig;
}
