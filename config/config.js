module.exports = {
  development: {
    username: "bricksync_hchm_user",
    password: "xsw3FkZSTcUrtGl0y4gRECIcvvAxV3wA",
    database: "bricksync_hchm",
    host: "dpg-d2irreumcj7s73cpthqg-a.oregon-postgres.render.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  },
  test: {
    username: "bricksync_hchm_user",
    password: "xsw3FkZSTcUrtGl0y4gRECIcvvAxV3wA",
    database: "bricksync_hchm",
    host: "dpg-d2irreumcj7s73cpthqg-a.oregon-postgres.render.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  },
  production: {
    username: "bricksync_hchm_user",
    password: "xsw3FkZSTcUrtGl0y4gRECIcvvAxV3wA",
    database: "bricksync_hchm",
    host: "dpg-d2irreumcj7s73cpthqg-a.oregon-postgres.render.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
};
