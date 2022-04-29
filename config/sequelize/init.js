const sequelize = require('./sequelize');

const Zawodnik = require('../../model/sequelize/zawodnicy');
const Sztuka = require('../../model/sequelize/sztuks');
const Tren = require('../../model/sequelize/tren');

const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');

module.exports = () => {
    Zawodnik.hasMany(Tren, {
        as: 'trens',
        foreignKey: {name: 'zawodnik_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Tren.belongsTo(Zawodnik, {as: 'zawodnik', foreignKey: {name: 'zawodnik_id', allowNull: false}});
    Sztuka.hasMany(Tren, {
        as: 'trens',
        foreignKey: {name: 'sztuka_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Tren.belongsTo(Sztuka, {as: 'sztuka', foreignKey: {name: 'sztuka_id', allowNull: false}});

    let allZawodnicy, allSztuki;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Zawodnik.findAll();
        })
        .then(zawodnicy => {
            if (!zawodnicy || zawodnicy.length == 0) {
                return Zawodnik.bulkCreate([
                    {
                        firstName: 'Jan',
                        lastName: 'Kowalski',
                        email: 'jan.kowalski@gmail.com',
                        birthtime: '1999-01-01',
                        adres: 'Warszawa',
                        password: passHash
                    },
                    {
                        firstName: 'Mateusz',
                        lastName: 'Nowak',
                        email: 'smdks@ms.pl',
                        birthtime: '1998-01-01',
                        adres: 'Krakow',
                        password: passHash
                    }
                ])
                    .then(() => {
                        return Zawodnik.findAll();
                    });
            } else {
                return zawodnicy;
            }
        })
        .then(zawodnicy => {
            allZawodnicy = zawodnicy;
            return Sztuka.findAll();
        })
        .then(sztuks => {
            if (!sztuks || sztuks.length == 0) {
                return Sztuka.bulkCreate([
                    {
                        nazwaSztuki: 'bjj',
                        trener: 'tyson',
                        mistrzSztuki: 'khabib',
                        opisSztuki: 'parter',
                        limit: '5'
                    },
                    {
                        nazwaSztuki: 'boks',
                        trener: 'fury',
                        mistrzSztuki: 'wilder',
                        opisSztuki: 'stojka',
                        limit: '10'
                    }
                ])
                    .then(() => {
                        return Sztuka.findAll();
                    });
            } else {
                return sztuks;
            }
        })
        .then(sztuks => {
            allSztuki = sztuks;
            return Tren.findAll();
        })
        .then(trens => {
            if (!trens || trens.length == 0) {
                return Tren.bulkCreate([
                    {
                        zawodnik_id: allZawodnicy[0]._id,
                        sztuka_id: allSztuki[0]._id,

                        dataPrzyjeciaOd: '2020-01-01',
                        dataPrzyjeciaDo: '2024-01-01',
                        oplata: '100',
                        rabat: '10'
                    },
                    {
                        zawodnik_id: allZawodnicy[1]._id,
                        sztuka_id: allSztuki[1]._id,

                        dataPrzyjeciaOd: '2021-02-01',
                        dataPrzyjeciaDo: '2023-02-01',
                        oplata: '200',
                        rabat: '15'
                    }
                ]);
            } else {
                return trens;
            }
        });
};