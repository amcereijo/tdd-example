module.exports = (mongoose, uri, options) => {
  mongoose.connect(uri, options);

  mongoose.connection.once('connected', () => {
    console.log('[fmongoose-connect] Mongoose connected');
  });

  mongoose.connection.once('error', (err) => {
    console.log('[fmongoose-connect] Mongoose error: ', err);
    throw err;
  });

  mongoose.connection.once('disconnected', () => {
    console.log('[fmongoose-connect] Mongoose disconnected');
  });

  process.once('SIGINT', () => mongoose.connection.close(() => {
    console.error('[fmongoose-connect] Mongoose disconnected');
    process.exit(0);
  }));
};
