
const sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();


const connection = new sequelize("encurtadordelinks", process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

module.exports = connection;