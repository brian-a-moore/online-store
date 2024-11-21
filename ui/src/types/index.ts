import { HTTP_METHOD } from '../constants';

export type Modal = {
  title: string;
  Body: React.ReactNode;
  ActionBar?: React.ReactNode;
};

export type Params<D = unknown, P = unknown> = {
  method: HTTP_METHOD;
  url: string;
  data?: D;
  params?: P;
};
