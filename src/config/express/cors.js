const cors = require('cors');

function initCors(app) {
  app.use(cors());
  console.log('[server] Loaded cors middleware');
}

module.exports = initCors;
