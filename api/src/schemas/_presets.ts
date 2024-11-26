import { z } from 'zod';

export const bool = z.boolean();
export const empty = z.object({}).strict();
export const itemTypeId = z.number().int().min(1).max(2);
export const page = z.string().min(1).max(6);
export const price = z.number().positive().min(1).max(999999);
export const qty = z.number().int().positive().min(1).max(999);
export const role = z.number().int().min(1).max(2);
export const strShort = z.string().min(1).max(256);
export const strLong = z.string().min(1).max(2048);
export const strShortOptional = z.string().min(0).max(256).optional();
export const strLongOptional = z.string().min(0).max(2048).optional();
export const uuid = z.string().uuid();
