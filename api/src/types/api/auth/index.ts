import { z } from 'zod';
import * as authSchemas from '../../../schemas/auth';

export type LoginAuthBody = z.infer<typeof authSchemas.loginAuthSchema.body>;
export type LoginAuthParams = z.infer<typeof authSchemas.loginAuthSchema.params>;
export type LoginAuthQuery = z.infer<typeof authSchemas.loginAuthSchema.query>;
export type LoginAuthResponse = { id: string; token: string };

export type VerifyTokenAuthBody = z.infer<typeof authSchemas.verifyTokenAuthSchema.body>;
export type VerifyTokenAuthParams = z.infer<typeof authSchemas.verifyTokenAuthSchema.params>;
export type VerifyTokenAuthQuery = z.infer<typeof authSchemas.verifyTokenAuthSchema.query>;
export type VerifyTokenAuthResponse = { user: { id: string; domain: 'admin' | 'user' }; refreshToken: string };

export type ChangePasswordAuthBody = z.infer<typeof authSchemas.changePasswordAuthSchema.body>;
export type ChangePasswordAuthParams = z.infer<typeof authSchemas.changePasswordAuthSchema.params>;
export type ChangePasswordAuthQuery = z.infer<typeof authSchemas.changePasswordAuthSchema.query>;
