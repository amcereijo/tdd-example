"use strict";
module.exports = {
    port: process.env.PORT,
    mongo: {
        host: [process.env.MONGO_HOSTS],
        port: [process.env.MONGO_PORT],
        dataBaseName: process.env.MONGO_DB_NAME,
        options: {
            replicaSet: process.env.MONGO_REPLICA_SET,
        },
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
    },
    services: {
        countries: {
            host: process.env.COUNTRY_API_HOST,
            namePath: process.env.COUNTRY_API_NAME_PATH,
        },
    },
};
