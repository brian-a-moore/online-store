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
