const COUNTRY_NOT_FOUND = 'Country not exists';

class DataNotFoundInServiceError extends Error {
  constructor() {
    super();
    this.message = COUNTRY_NOT_FOUND;
  }
}

DataNotFoundInServiceError.message = COUNTRY_NOT_FOUND;

module.exports = DataNotFoundInServiceError;
