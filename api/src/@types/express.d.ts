// src/types/express.d.ts
declare namespace Express {
  export interface Request {
    user?: { isAdmin: boolean; id: string; passwordReset: boolean };
    routeId?: string;
  }
}
