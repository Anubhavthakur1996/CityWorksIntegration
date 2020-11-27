module.exports = {
  HOST: "localhost",

  USER: "root",

  PASSWORD: "pass",

  DB: "testdb",

  dialect: "mysql",

  port: 3000,

  pool: {
    max: 5,

    min: 0,

    acquire: 30000,

    idle: 10000,
  },
};
