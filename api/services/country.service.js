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

  processsError(errorResponse) {
    this.maybeThrowNoDataFromServie(errorResponse);
    throw new this.errors.ServiceNotAvailableError();
  }

  async callForCountryName(name) {
    return Promise.resolve()
      .then(() => request.get(`${this.config.host}${this.config.namePath}/${name}`))
      .then((response) => response.body)
      .catch(this.processsError.bind(this));
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
