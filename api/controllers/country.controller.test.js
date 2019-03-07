const mongoose = require('mongoose');
const db = require('../../test/test-db')(mongoose);

describe('CountryController', () => {
  before(() => db.connect());
  after(() => db.disconnect());

  describe('GET /country/:name/capital/', () => {
    // TODO implement
  });
});
