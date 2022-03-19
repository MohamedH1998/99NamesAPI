import app from './src/app.js';

import createLogger from './src/utils/logger.js';

const logger = createLogger('names-service');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.log({
  level: 'info',
  message: `listening on port: ${PORT}`,
}));
