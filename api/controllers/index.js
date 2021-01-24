const json2csv = require('json2csv');
const MonitController = require('./monit.controller');
const CountryController = require('./country.controller');
const CountryModel = require('../../models/country');
const CountryService = require('../services/country.service');
const config = require('../../config/server');
const errors = require('../errors');

const monitController = new MonitController();
const countryService = new CountryService(CountryModel, config, errors);
const countryController = new CountryController(countryService, json2csv);

module.exports = [
  {
    method: 'get',
    path: '/monit/health',
    handler: monitController.get.bind(monitController),
  },
  {
    method: 'get',
    path: '/country/resume',
    handler: countryController.getResume.bind(countryController),
  },
  {
    method: 'get',
    path: '/country/:name/capital/',
    handler: countryController.getCapital.bind(countryController),
  },
];
