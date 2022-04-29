const Zawodnik = require("../../model/sequelize/zawodnicy");
const Sztuka = require("../../model/sequelize/sztuks");
const Tren = require("../../model/sequelize/tren");
const authUtil = require("../../util/authUtils");

exports.getZawodnik = () => {
    return Zawodnik.findAll();
};
exports.getZawodnikById = (zawodnikId) => {
    return Zawodnik.findByPk(zawodnikId,
        {
            include: [{
                model: Tren,
                as: 'trens',
                include: [{
                    model: Sztuka,
                    as: 'sztuka'
                }]
            }]
        });
};

exports.createZawodnik = (newZawodnikData) => {
    return Zawodnik.create({
        firstName: newZawodnikData.firstName,
        lastName: newZawodnikData.lastName,
        email: newZawodnikData.email,
        birthtime: newZawodnikData.birthtime,
        adres: newZawodnikData.adres,
        password: authUtil.hashPassword(newZawodnikData.password)
    });
};

exports.updateZawodnik = (zawodnikId, zawodnikData) => {

    zawodnikData.password = authUtil.hashPassword(zawodnikData.password)

    return Zawodnik.update(zawodnikData, {where: {_id: zawodnikId}});
};
exports.findByEmail = (email) => {
    return Zawodnik.findOne({
        where: {email: email}
    });
}

    exports.deleteZawodnik = (zawodnikId) => {
        return Zawodnik.destroy({
            where: {_id: zawodnikId}
        });

    };