module.exports = {
  port: process.env.PORT,
  // remove it no mongo connection needed
  mongo: {
    host: [process.env.MONGO_HOSTS], // list of hosts
    port: [process.env.MONGO_PORT], // list of ports
    dataBaseName: process.env.MONGO_DB_NAME,
    options: {
      replicaSet: process.env.MONGO_REPLICA_SET,
      poolSize: process.env.MONGO_POOL_SIZE,
    },
    user: process.env.MONGO_USER, // optional
    pass: process.env.MONGO_PASS, // optional
  },
  services: {
    countries: {
      host: process.env.COUNTRY_API_HOST,
      namePath: process.env.COUNTRY_API_NAME_PATH,
    },
  },
};
