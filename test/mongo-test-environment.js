/* eslint-disable import/no-extraneous-dependencies */
const NodeEnvironment = require('jest-environment-node');
const MongodbMemoryServer = require('mongodb-memory-server');

class MongoDbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    // eslint-disable-next-line new-cap
    this.mongod = new MongodbMemoryServer.default();
  }

  async setup() {
    await super.setup();

    this.global.__MONGO_URI__ = await this.mongod.getUri();
    this.global.__MONGO_DB_NAME__ = await this.mongod.getDbName();
    // this is used to have different names for documents created while testing
    this.global.__COUNTERS__ = {
      user: 0,
    };
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoDbEnvironment;
