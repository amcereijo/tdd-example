class CountryController {
  /**
   *
   * @param {Object} countryService service for country actions
   */
  constructor(countryService) {
    this.name = 'CountryController';
    this.countryService = countryService;
  }

  /**
   *
   * @param {HttpRequest} req
   * @param {HttpResponse} res
   * @param {Function} next
   */
  async getCapital(req, res) {
    const { name } = req.params;
    const serviceResponse = await this.countryService.callForCountryName(name);
    const country = await this.countryService.saveCountryData(name, serviceResponse);

    res.send({ name, capital: country.capital });
  }
}

module.exports = CountryController;
