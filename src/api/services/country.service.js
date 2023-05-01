class CountryService {
  /**
   *
   * @param {Object} CountryModel mongoose object for "countries" collection
   */
  constructor(CountryModel) {
    this.CountryModel = CountryModel;
  }
}

module.exports = CountryService;
