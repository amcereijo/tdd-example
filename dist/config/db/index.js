"use strict";
const Promise = require('bluebird');
const mongoose = require('mongoose');
const mongooseConnect = require('./mongoose-connect');
const properties = require('../server/index');
const userPass = properties.mongo.user && properties.mongo.pass ? `${properties.mongo.user}:${properties.mongo.pass}@` : '';
const hostProperty = [].concat(properties.mongo.host);
const portProperty = [].concat(properties.mongo.port);
const hosts = hostProperty.reduce((s, h, i) => `${s}${i > 0 ? ',' : ''}${h}:${portProperty[i] || portProperty[0]}`, '');
const uri = `mongodb://${userPass}${hosts}/${properties.mongo.dataBaseName}`;
const options = properties.mongo.options || {};
options.useNewUrlParser = true;
module.exports = () => {
    mongoose.Promise = Promise;
    mongooseConnect(mongoose, uri, options);
};
