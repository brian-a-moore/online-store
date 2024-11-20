import { Item } from '@prisma/client';

export type FixedItemConfig = {
  generateQRCode: boolean;
  requireVerification: boolean;
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
