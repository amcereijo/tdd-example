const MonitController = require('./monit.controller');
const CountryController = require('./country.controller');
const CountryModel = require('../../models/country');
const CountryService = require('../services/country.service');
const config = require('../../config/server');

const monitController = new MonitController();
const countryService = new CountryService(CountryModel, config);
const countryController = new CountryController(countryService);

module.exports = [
  {
    method: 'get',
    path: '/monit/health',
    handler: monitController.get.bind(monitController),
  },
  {
    method: 'get',
    path: '/country/:name/capital/',
    handler: countryController.getCapital.bind(countryController),
  },
];
