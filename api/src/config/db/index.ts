/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Prisma, PrismaClient } from '@prisma/client';
import { ENV_TYPE, STATUS_CODE } from '@sunami/constants';
import logger from '../logger';

const isJest = process.env.JEST_WORKER_ID !== undefined;
const appEnv = process.env.APP_ENV as ENV_TYPE;
const info = { emit: 'event', level: 'info' };
const warn = { emit: 'event', level: 'warn' };
const error = { emit: 'event', level: 'error' };

const logMap = new Map([
  [ENV_TYPE.LOCAL, [info, warn, error]],
  [ENV_TYPE.DEV, [info, warn, error]],
  [ENV_TYPE.TEST, [info, warn, error]],
  [ENV_TYPE.PROD, [warn, error]],
]) as unknown as Map<ENV_TYPE, Prisma.LogLevel[]>;

const prisma = new PrismaClient({
  log: isJest ? [] : logMap.get(appEnv),
});

// @ts-ignore
prisma.$on('query', (e: Prisma.QueryEvent) => {
  logger.debug(JSON.stringify(e));
});

// @ts-ignore
prisma.$on('info', (e: Prisma.QueryEvent) => {
  logger.info(JSON.stringify(e));
});

// @ts-ignore
prisma.$on('warn', (e: Prisma.QueryEvent) => {
  logger.warn(JSON.stringify(e));
});

// @ts-ignore
prisma.$on('error', (e: Prisma.QueryEvent) => {
  logger.error(JSON.stringify(e));
});

export const prismaCodeToStatusCode = (code: string) => {
  switch (code) {
    case 'P2001':
    case 'P2025':
      return STATUS_CODE.NOT_FOUND;
    default:
      return STATUS_CODE.SERVER_ERROR;
  }
};

export default prisma;
