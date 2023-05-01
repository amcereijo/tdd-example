import http from 'http';

import app from './app';
import config from './config';

process.on('uncaughtException', (err) => {
  console.error('uncaughtException exception: ', err);
});

app.set('port', config.port);

const server = http.createServer(app);

function onError(error: Error) {
  console.error('[server]There was an error starting the server', error);
  process.exit(1);
}

function onListening() {
  const addr = server.address();
  if (!addr) {
    console.error('No address from server');
    process.exit(1);
  }
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  console.log(`[server] Server listening on ${bind}`);
}

server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);
