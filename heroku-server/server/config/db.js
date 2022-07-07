require("dotenv").config({ path: "../.env" });
const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = db;
