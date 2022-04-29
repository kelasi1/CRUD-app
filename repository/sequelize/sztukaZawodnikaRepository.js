const Sequelize = require('sequelize');

const Zawodnik = require("../../model/sequelize/zawodnicy");
const Sztuka = require("../../model/sequelize/sztuks");
const Tren = require("../../model/sequelize/tren");

exports.getSztukaZawodnika = () => {
    return Tren.findAll({
        include: [
            {
                model: Zawodnik,
                as: 'zawodnik'
            },
            {
                model: Sztuka,
                as: 'sztuka'
            }]
    });
};


exports.getSztukaZawodnikaById = (trenId) => {
    return Tren.findByPk(trenId, {
        include: [
            {
                model: Zawodnik,
                as: 'zawodnik'
            },
            {
                model: Sztuka,
                as: 'sztuka'
            }]
    });
};

exports.createSztukaZawodnika = (data) => {
    console.log(JSON.stringify(data));

    return Tren.create({
        zawodnik_id: data.zawodnik_id,
        sztuka_id: data.sztuka_id,
        dataPrzyjeciaOd: data.dataPrzyjeciaOd,
        dataPrzyjeciaDo: data.dataPrzyjeciaDo,
        oplata: data.oplata,
        rabat: data.rabat
    });
};

exports.updateSztukaZawodnika = (trenId, data) => {
    const zawodnik_id = data.zawodnik_id;
    const sztuka_id = data.sztuka_id;
    const dataPrzyjeciaOd = data.dataPrzyjeciaOd;
    const dataPrzyjeciaDo = data.dataPrzyjeciaDo;
    const oplata = data.oplata;
    const rabat = data.rabat;
    return Tren.update(data, {where: {_id: trenId}});
}

exports.deleteSztukaZawodnika = (trenId) => {
    return Tren.destroy({
        where: {_id: trenId}
    });
}

exports.deleteManySztuka = (trenIds) => {
    return Tren.find({_id: {[Sequelize.Op.in]: trenIds}})
}