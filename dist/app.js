"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
});
require('./config/db')();
require('./config/express/pre')(app);
require('./api')(app);
require('./config/express/handle-not-found')(app);
require('./config/express/post')(app);
exports.default = app;
