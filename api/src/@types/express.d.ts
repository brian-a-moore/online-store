// src/types/express.d.ts
declare namespace Express {
  export interface Request {
    user?: { id: string; domain: 'admin' | 'user' };
    routeId?: string;
  }
}
