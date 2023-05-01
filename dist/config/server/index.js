"use strict";
const fs = require('fs');
const dotenv = require('dotenv');
if (process.env.ENV_TEST) {
    const envConfig = dotenv.parse(fs.readFileSync(`${process.cwd()}/${process.env.ENV_TEST}`));
    Object.keys(envConfig).forEach((prop) => {
        process.env[prop] = envConfig[prop];
    });
}
else {
    dotenv.config();
}
const config = require('./config');
module.exports = config;
