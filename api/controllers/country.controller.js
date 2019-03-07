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
   */
  async getCapital(req, res) {
    const { name } = req.params;
    let country = await this.countryService.findCountryByName(name);

    if (!country) {
      const serviceResponse = await this.countryService.callForCountryName(name);
      country = await this.countryService.saveCountryData(name, serviceResponse);
    }

    res.send({ name, capital: country.capital });
  }
}

module.exports = CountryController;
