const sequelize = require("sequelize");
const connection = require("./database.js");

const Link = connection.define("links", {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    original_link: {
        type: sequelize.STRING
    },
    short_link: {
        type: sequelize.STRING
    }
});

Link.sync({force: false}).then(() => {
    console.log("Tabela criada com sucesso");
})

module.exports = Link;