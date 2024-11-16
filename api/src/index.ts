import serverless from '@codegenie/serverless-express';
import { Handler } from 'aws-lambda';
import { app } from './app';

export const handler: Handler = serverless({ app });
