const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Sztuka = sequelize.define('Sztuka', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nazwaSztuki: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3, 60],
                msg: "Pole powinno zawierac od 3 do 60 znaków"
            },
        }
    },
    trener: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3, 60],
                msg: "Pole powinno zawierac od 3 do 60 znaków"
            },
        }
    },
    mistrzSztuki: {
        type: Sequelize.STRING,
        allowNull: true,

    },
    opisSztuki: {
        type: Sequelize.STRING,
        allowNull: true,



    },
    limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: "Pole powinno zawierac liczbe"
            }
        }
    }

});
module.exports = Sztuka;