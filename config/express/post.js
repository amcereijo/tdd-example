const handleErrorMiddleware = require('./handle-error');

module.exports = (app) => {
  handleErrorMiddleware(app);
};
