require("dotenv").config({ path: "../.env" });
const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
    host: process.env.LOCAL_HOST,
    dialect: "postgres",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = db;
