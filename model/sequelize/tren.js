const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Tren = sequelize.define('Tren', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

    },
    zawodnik_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane"
            },
        }
    },
    sztuka_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Pole jest wymagane"
            },
        }
    },
    dataPrzyjeciaOd: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isBefore: {
                args: '2022-01-28',
                msg: "Data przed nie moze być większa niż data po"
            }
        }
    },
    dataPrzyjeciaDo: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isAfter: {

                args: '2022-01-28',
                msg: "Data po nie może byc mniejsza niz data przed"
            }
        }
    },
    oplata: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"

            }
        }

    },
    rabat: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"


            }
        }
    }


});
module.exports = Tren;