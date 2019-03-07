const mongooseOpts = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true,
};

module.exports = (mongoose) => {
  async function connect() {
    await mongoose.connect(__MONGO_URI__, mongooseOpts);

    mongoose.connection.on('error', (e) => {
      console.log('TEST-DB ERROR', e);
      mongoose.connect(__MONGO_URI__, mongooseOpts);
    });
  }

  async function disconnect() {
    await mongoose.disconnect();
  }

  return {
    connect,
    disconnect,
  };
};
