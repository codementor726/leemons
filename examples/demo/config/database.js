module.exports = {
  connections: {
    mysql: {
      connector: 'bookshelf',
      useCustomRollback: process.env['USE_CUSTOM_ROLLBACK'] === 'true',
      settings: {
        client: 'mysql',
        database: 'leemon',
        username: 'root',
        password: '',
        port: '3306',
        host: 'localhost',
        pool: {
          min: 5,
          max: 50,
        },
      },
    },
    mongo: {
      connector: 'mongoose',
      settings: {
        database: process.env['NOSQL_DATABASE'],
        authDatabase: process.env['NOSQL_AUTH_DATABASE'],
        username: process.env['NOSQL_USERNAME'],
        password: process.env['NOSQL_PASSWORD'],
        port: process.env['NOSQL_PORT'],
        host: process.env['NOSQL_HOST'],
        srv: process.env['NOSQL_SRV'],
        // replicaSet: process.env['NOSQL_CLUSTER'],
        pool: {
          min: 5,
          max: 1000,
        },
      },
    },
  },
  defaultConnection: 'mysql',
};
