import { Item } from '@prisma/client';

export type FixedItemConfig = {
  isRedeemable: boolean;
  redeemByDate?: string;
  price: number;
};

export type VariableItemConfig = {
  defaultAmount: number;
  minAmount: number;
  maxAmount: number;
  presetAmounts: number[];
};

export interface FixedItem extends Item {
  config: FixedItemConfig;
}
export interface VariableItem extends Item {
  config: VariableItemConfig;
}
