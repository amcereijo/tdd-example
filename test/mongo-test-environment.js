/* eslint-disable import/no-extraneous-dependencies */
const NodeEnvironment = require('jest-environment-node').TestEnvironment;
const { MongoMemoryServer } = require('mongodb-memory-server');

class MongoDbEnvironment extends NodeEnvironment {
  async setup() {
    this.mongod = await MongoMemoryServer.create();

    await super.setup();

    this.global.__MONGO_URI__ = this.mongod.getUri();
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
