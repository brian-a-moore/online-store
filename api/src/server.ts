import http from 'http';
import { app } from './app';
import logger from './config/logger';
import { DEFAULT_PORT } from './constants';

const { PORT = DEFAULT_PORT } = process.env;

http.createServer(app).listen(PORT, () => {
  const { APP_ENV, PORT } = process.env;

  logger.info('API SERVER - Online', {
    url: `https://localhost:${PORT}`,
    port: PORT,
    environment: APP_ENV,
  });
});
