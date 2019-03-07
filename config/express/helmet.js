const helmet = require('helmet');

function initHelmet(app) {
  app.use(helmet());
  console.log('[server] Loaded helmet middleware');
}

module.exports = initHelmet;
