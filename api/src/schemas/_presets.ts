import { z } from 'zod';

export const bool = z.boolean();
export const empty = z.object({}).strict();
export const itemType = z.enum(['donation', 'merchandise', 'ticket']);
export const obj = (args: any) => z.object(args).strict();
export const price = z.number().positive().min(1).max(999999);
export const qty = z.number().int().positive().min(1).max(999);
export const role = z.number().int().min(1).max(3);
export const strShort = z.string().min(1).max(256);
export const strLong = z.string().min(1).max(2048);
export const uuid = z.string().uuid();
