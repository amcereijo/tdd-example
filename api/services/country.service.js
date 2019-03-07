const request = require('superagent');

function getCapital(data) {
  return data[0].capital;
}

class CountryService {
  /**
   *
   * @param {Object} CountryModel mongoose object for "countries" collection
   */
  constructor(CountryModel, config, errors) {
    this.CountryModel = CountryModel;
    this.config = config.services.countries;
    this.errors = errors;
  }

  maybeThrowNoDataFromServie(errorResponse) {
    if (errorResponse.status === 404) {
      throw new this.errors.DataNotFoundInServiceError();
    }
  }

  async callForCountryName(name) {
    try {
      const res = await request.get(`${this.config.host}${this.config.namePath}/${name}`);
      this.maybeThrowNoDataFromServie(res.body);

      return res.body;
    } catch (errorResponse) {
      this.maybeThrowNoDataFromServie(errorResponse);
      throw errorResponse;
    }
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
