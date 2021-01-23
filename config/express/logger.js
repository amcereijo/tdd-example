const winston = require('winston');
const expressWinston = require('express-winston');

function initLogger(app) {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console(),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
  }));

  console.log('[server] Loaded logger middleware');
}

module.exports = initLogger;
