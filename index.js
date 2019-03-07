const express = require('express');

const app = express();

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
});

// initialize app
require('./config/db')();
require('./config/express/pre')(app);
require('./api')(app);
require('./config/express/handle-not-found')(app);
require('./config/express/post')(app);


module.exports = app;
