const Zawodnik = require("../../model/sequelize/zawodnicy");
const Sztuka = require("../../model/sequelize/sztuks");
const Tren = require("../../model/sequelize/tren");

exports.getSztuka = () => {
    return Sztuka.findAll();
};
exports.getSztukaById = (sztukaId) => {
    return Sztuka.findByPk(sztukaId,
        {
            include: [{
                model: Tren,
                as: 'trens',
                include: [{
                    model: Zawodnik,
                    as: 'zawodnik'
                }]
            }]
        });
};

exports.createSztuka = (newSztukaData) => {
    return Sztuka.create({
        nazwaSztuki: newSztukaData.nazwaSztuki,
        trener: newSztukaData.trener,
        mistrzSztuki: newSztukaData.mistrzSztuki,
        opisSztuki: newSztukaData.opisSztuki,
        limit: newSztukaData.limit
    });
};

exports.updateSztuka = (sztukaId, sztukaData) => {
    const nazwaSztuki = sztukaData.nazwaSztuki;
    const trener = sztukaData.trener;
    const mistrzSztuki = sztukaData.mistrzSztuki;
    const opisSztuki = sztukaData.opisSztuki;
    const limit = sztukaData.limit;
    return Sztuka.update(sztukaData, {where: {_id: sztukaId}});
};

exports.deleteSztuka = (sztukaId) => {
    return Sztuka.destroy({
        where: {_id: sztukaId}
    });

};