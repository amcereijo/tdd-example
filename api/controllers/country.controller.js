const ERROR_500 = 500;

class CountryController {
  /**
   *
   * @param {Object} countryService service for country actions
   * @param {Object} json2csv https://www.npmjs.com/package/json2csv
   */
  constructor(countryService, json2csv) {
    this.name = 'CountryController';
    this.countryService = countryService;
    this.json2csv = json2csv;
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
      const code = err.code || ERROR_500;
      res.status(code).send({ code, message: err.message });
    }
  }

  streamCSV(countries, res) {
    res.header('Content-Disposition', 'attachment; filename=resume.csv');
    res.header('Content-Type', 'text/csv');

    const asyncParser = new this.json2csv.AsyncParser({
      fields: ['name', 'capital'],
    });

    asyncParser.processor
      .on('end', () => { res.end(); })
      .pipe(res);

    countries.forEach(({ name, capital }) => {
      asyncParser.input.push(JSON.stringify({ name, capital }));
    });

    asyncParser.input.push(null);
  }

  /**
   *
   * @param {HttpRequest} req
   * @param {HttpResponse} res
   */
  async getResume(req, res) {
    const allCountries = await this.countryService.findAllCountries();
    this.streamCSV(allCountries, res);
  }
}

module.exports = CountryController;
