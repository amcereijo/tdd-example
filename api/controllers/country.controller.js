class CountryController {
  /**
   *
   * @param {Object} countryService service for country actions
   */
  constructor(countryService) {
    this.name = 'CountryController';
    this.countryService = countryService;
  }

  async loadCountryUsingService(name) {
    const serviceResponse = await this.countryService.callForCountryName(name);
    const country = await this.countryService.saveCountryData(name, serviceResponse);
    return country;
  }

  /**
   *
   * @param {HttpRequest} req
   * @param {HttpResponse} res
   */
  async getCapital(req, res) {
    const { name } = req.params;
    let country = await this.countryService.findCountryByName(name);

    try {
      if (!country) {
        country = await this.loadCountryUsingService(name);
      }

      res.send({ name, capital: country.capital });
    } catch (err) {
      res.status(500).send({ code: 500, message: err.message });
    }
  }
}

module.exports = CountryController;
