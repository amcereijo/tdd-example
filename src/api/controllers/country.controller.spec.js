const mongoose = require('mongoose');
const db = require('../../../test/test-db')(mongoose);

describe('CountryController', () => {
  beforeAll(() => db.connect());
  afterAll(() => db.disconnect());

  describe('GET /country/:name/capital/', () => {
    // TODO implement
    it('should return the capital of the country', () => {
      expect(true).toBe(true);
    });
  });
});
