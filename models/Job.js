const Sequelize = require("sequelize");
const db = require("../db/connection");

const Job = db.define("job", {
    titulo: {
        type: Sequelize.STRING,
    },
    descricao: {
        type: Sequelize.STRING,
    },
    salario:{
        type: Sequelize.STRING,
    },
    empresa:{
        type: Sequelize.STRING,
    },
    EMAIL:{
        type: Sequelize.STRING,
    },
    vagaNova:{
        type: Sequelize.INTEGER,
    },
    createdAt: {
        type: Sequelize.STRING,
    },
    updatedAt: {
        type: Sequelize.STRING,
    }
});

module.exports = Job;