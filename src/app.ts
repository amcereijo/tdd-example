import express from 'express';
import configDb from './config/db';
import preMiddlewares from './config/express/pre';
import api from'./api';
import handleNotFound from './config/express/handle-not-found';
import postMiddlewares from './config/express/post';

const app = express();

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
});

// initialize app
configDb();
preMiddlewares(app);
api(app);
handleNotFound(app);
postMiddlewares(app);

export default app;
