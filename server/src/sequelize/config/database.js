module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
};
