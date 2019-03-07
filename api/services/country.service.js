const request = require('superagent');

function getCapital(data) {
  return data[0].capital;
}

class CountryService {
  /**
   *
   * @param {Object} CountryModel mongoose object for "countries" collection
   */
  constructor(CountryModel, config) {
    this.CountryModel = CountryModel;
    this.config = config.services.countries;
  }

  async callForCountryName(name) {
    const res = await request.get(`${this.config.host}${this.config.namePath}/${name}`);
    return res.body;
  }

  saveCountryData(name, serviceResponse) {
    const country = new this.CountryModel({ name, capital: getCapital(serviceResponse) });
    return country.save();
  }

  findCountryByName(name) {
    return this.CountryModel.findOne({ name });
  }
}

module.exports = CountryService;
