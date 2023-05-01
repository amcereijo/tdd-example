"use strict";
class CountryController {
    constructor(countryService) {
        this.name = 'CountryController';
        this.countryService = countryService;
    }
    getCapital(req, res, next) {
        console.log(this.name);
        res.send({});
        next();
    }
}
module.exports = CountryController;
