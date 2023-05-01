"use strict";
const mongoose = require('mongoose');
const CountrySchema = new mongoose.Schema({
    name: String,
    capital: String,
});
const collectionName = 'countries';
const CountryModel = mongoose.model(collectionName, CountrySchema, collectionName);
module.exports = CountryModel;
