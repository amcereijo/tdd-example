
const chai = require('chai');

// Uncomment if you use sinon-chai
// const sinonChai = require('sinon-chai');
// chai.use(sinonChai);

global.context = describe;
global.before = beforeAll;
global.after = afterAll;
global.expect = chai.expect;

// For fintonic-logger
global.console.trackError = jest.fn();

if (!process.env.LOG) {
  global.console.log = jest.fn();
  global.console.error = jest.fn();
}
