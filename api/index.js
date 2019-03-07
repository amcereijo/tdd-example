const routes = require('./controllers');
const buildRouter = require('./build-router');

module.exports = (app) => {
  const router = buildRouter(routes, []);

  app.use('/', router);
};
