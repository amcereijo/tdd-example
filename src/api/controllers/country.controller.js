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
  getCapital(req, res, next) {
    console.log(this.name);
    // TODO implement
    res.send({});
    next();
  }
}

module.exports = CountryController;
