const corsMiddleware = require('./cors');
const helmetMiddleware = require('./helmet');
const bodyParserMiddleware = require('./body-parser');
const loggerMiddleware = require('./logger');

module.exports = (app) => {
  loggerMiddleware(app);
  corsMiddleware(app);
  helmetMiddleware(app);
  bodyParserMiddleware(app);
};
