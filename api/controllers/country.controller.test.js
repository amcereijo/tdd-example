const mongoose = require('mongoose');
const nock = require('nock');
const supertest = require('supertest');
const db = require('../../test/test-db')(mongoose);
const testResponses = require('../../test/responses');
const config = require('../../config');
const app = require('../../');
const CountryModel = require('../../models/country');

describe('CountryController', () => {
  before(() => db.connect());
  after(() => db.disconnect());

  describe('GET /country/:name/capital', () => {
    describe('when it receive a country name and not have the country in database and all works', () => {
      const countryName = 'Spain';
      let response;
      before((done) => {
        nock(config.services.countries.host)
          .get(`${config.services.countries.namePath}/${countryName}`)
          .reply(200, testResponses.get);

        supertest(app)
          .get(`/country/${countryName}/capital`)
          .end((req, res) => {
            response = res;
            done();
          });
      });
      after(() => {
        nock.cleanAll();
        return CountryModel.remove({});
      });

      it('should save the capital in database', (done) => {
        CountryModel.findOne({ name: countryName })
          .then((country) => {
            expect(country.capital).to.eql(testResponses.get[0].capital);
            done();
          });
      });
      it('should return the capital to the client', () => {
        expect(response.body.capital).to.eql(testResponses.get[0].capital);
        expect(response.body.name).to.eql(countryName);
      });
    });

    describe('when it receive a country name and have the country in database and all works', () => {
      const countryName = 'Spain';

      let response;
      before(async (done) => {
        nock(config.services.countries.host)
          .get(`${config.services.countries.namePath}/${countryName}`)
          .reply(500, 'ERROR');

        await new CountryModel({
          name: countryName,
          capital: testResponses.get[0].capital,
        }).save();

        supertest(app)
          .get(`/country/${countryName}/capital`)
          .end((req, res) => {
            response = res;
            done();
          });
      });
      after(() => {
        nock.cleanAll();
        return CountryModel.remove({});
      });

      it('should return the capital to the client', () => {
        expect(response.body.capital).to.eql(testResponses.get[0].capital);
        expect(response.body.name).to.eql(countryName);
      });
    });
  });
});
