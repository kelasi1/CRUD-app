const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Zawodnik = sequelize.define('Zawodnik', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
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
    lastName: {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Pole powinno zawierać prawidłowy adres email zgodny ze wzorcem"
            },
            notEmpty:{
               msg: "Pole nie moze byc puste"
            }


        }
    },
    birthtime: {
        type: Sequelize.DATE,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: "Pole nie moze byc puste"
            },
            isDate:{
                msg:"to nie data"
            }
        }

    },
    adres: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [3, 60],
                msg: "Pole powinno zawierac od 3 do 60 znaków"
            }
        }
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [1,60],
                msg: "Pole powinno zawierać od 1 do 60 znaków"
            },
        }
    }
});
module.exports = Zawodnik;