#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
process.on('uncaughtException', (err) => {
    console.error('uncaughtException exception: ', err);
});
app_1.default.set('port', config_1.default.port);
const server = http_1.default.createServer(app_1.default);
function onError(error) {
    console.error('[server]There was an error starting the server', error);
    process.exit(1);
}
function onListening() {
    const addr = server.address();
    if (!addr) {
        throw new Error(`No address from server`);
    }
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`[server] Server listening on ${bind}`);
}
server.listen(config_1.default.port);
server.on('error', onError);
server.on('listening', onListening);
