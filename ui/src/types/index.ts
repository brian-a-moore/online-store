import { HTTP_METHOD } from '../constants';

export type ColumnConfig = {
  key: string;
  label: string;
  render: (value: any) => React.JSX.Element;
};

type JsonValue = any;

export type StorePublicItem = {
  id: string;
  itemTypeId: number;
  name: string;
  description: string | null;
  image: string | null;
  config: JsonValue;
  maxQuantityPerOrder: number;
  product: {
    name: string;
  };
};

export type Modal = {
  title: string;
  Body: React.ReactNode;
  ActionBar?: JSX.Element[];
};

export type Params<D = unknown, P = unknown> = {
  method: HTTP_METHOD;
  url: string;
  data?: D;
  params?: P;
};
