const Sequelize = require("sequelize");
const db = require("../config/db");

const jobs = db.define(
    "jobs",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        author: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        avatar_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        author_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },

        date_posted: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = jobs;
