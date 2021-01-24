const mongoose = require('mongoose');
const nock = require('nock');
const supertest = require('supertest');
const csvSync = require('csv/lib/sync');
const db = require('../../test/test-db')(mongoose);
const testResponses = require('../../test/responses');
const config = require('../../config');
const app = require('../..');
const CountryModel = require('../../models/country');
const errors = require('../errors');

describe('CountryController', () => {
  before(() => db.connect());
  after(() => db.disconnect());

  describe('GET /country/:name/capital', () => {
    describe('when it receive a country name and not have the country in database and all works', () => {
      const countryName = 'Spain';
      let response;
      before(async () => {
        nock(config.services.countries.host)
          .get(`${config.services.countries.namePath}/${countryName}`)
          .reply(200, testResponses.get);

        response = await supertest(app)
          .get(`/country/${countryName}/capital`);
      });
      after(() => {
        nock.cleanAll();
        return CountryModel.deleteMany({});
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
      before(async () => {
        nock(config.services.countries.host)
          .get(`${config.services.countries.namePath}/${countryName}`)
          .reply(500, 'ERROR');

        await new CountryModel({
          name: countryName,
          capital: testResponses.get[0].capital,
        }).save();

        response = await supertest(app)
          .get(`/country/${countryName}/capital`);
      });
      after(() => {
        nock.cleanAll();
        return CountryModel.deleteMany({});
      });

      it('should return the capital to the client', () => {
        expect(response.body.capital).to.eql(testResponses.get[0].capital);
        expect(response.body.name).to.eql(countryName);
      });
    });

    describe('when it receive a country name and it is not found in database or service', () => {
      const countryName = 'Spain';

      let response;
      before(async () => {
        nock(config.services.countries.host)
          .get(`${config.services.countries.namePath}/${countryName}`)
          .reply(404, testResponses.getEmpty);

        response = await supertest(app)
          .get(`/country/${countryName}/capital`);
      });
      after(() => {
        nock.cleanAll();
      });

      it('should send error 404', () => {
        expect(response.statusCode).to.eql(404);
      });

      it('should return the error to the client', () => {
        expect(response.body.message).to.eql(errors.DataNotFoundInServiceError.message);
        expect(response.body.code).to.eql(404);
      });
    });

    describe('when it receive a country name and it is not found in database and service returns an error', () => {
      const countryName = 'Spain';

      let response;
      before(async () => {
        nock(config.services.countries.host)
          .get(`${config.services.countries.namePath}/${countryName}`)
          .reply(500, 'Unexpected error');

        response = await supertest(app)
          .get(`/country/${countryName}/capital`);
      });
      after(() => {
        nock.cleanAll();
      });

      it('should send error 500', () => {
        expect(response.statusCode).to.eql(500);
      });

      it('should return the error to the client', () => {
        expect(response.body.message).to.eql(errors.ServiceNotAvailableError.message);
        expect(response.body.code).to.eql(500);
      });
    });
  });

  describe('GET /country/resume', () => {
    describe('when there ara element in db', () => {
      let response;

      before(async () => {
        await CountryModel.insertMany([
          { name: 'España', capital: 'Madrid' },
          { name: 'Portugal', capital: 'Lisboa' },
        ]);

        response = await supertest(app)
          .get('/country/resume')
          .buffer()
          .parse((res, callback) => {
            res.setEncoding('binary');
            res.data = '';
            res.on('data', (chunk) => {
              res.data += chunk;
            });
            res.on('end', () => {
              callback(null, Buffer.from(res.data, 'binary'));
            });
          });
      });
      after(() => {});

      it('should return correct CSV file response', () => {
        expect(response.statusCode).to.equal(200);
        expect(response.headers['content-disposition']).to.be.equal('attachment; filename=resume.csv');
        expect(response.headers['content-type']).to.be.equal('text/csv; charset=utf-8');
        expect(response.headers['content-length']).to.not.equal('0');

        // validate downloaded content
        const csvContent = csvSync.parse(response.body, {
          delimiter: ',',
          columns: true,
        });

        expect(csvContent).to.have.lengthOf(2);

        expect(csvContent[0].name).to.eql('España');
        expect(csvContent[0].capital).to.eql('Madrid');
        expect(csvContent[1].name).to.eql('Portugal');
        expect(csvContent[1].capital).to.eql('Lisboa');
      });
    });
  });
});
