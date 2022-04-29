const SztukaZawodnikaRepository = require('../repository/sequelize/sztukaZawodnikaRepository');

exports.getSztukaZawodnika = (req, res, next) => {
    SztukaZawodnikaRepository.getSztukaZawodnika()
        .then(trens => {
            res.status(200).json(trens);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSztukaZawodnikaById = (req, res, next) => {
    const trenId = req.params.trenId;

    SztukaZawodnikaRepository.getSztukaZawodnikaById(trenId)
        .then(tren => {
            if (!tren) {
                res.status(404).json({
                    message: 'Sztuka Zawodnika with id: ' + trenId + ' not found'
                })
            } else {
                res.status(200).json(tren);
            }
        });
};

exports.createSztukaZawodnika = (req, res, next) => {
    SztukaZawodnikaRepository.createSztukaZawodnika(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateSztukaZawodnika = (req, res, next) => {
    const trenId = req.params.trenId;

    SztukaZawodnikaRepository.updateSztukaZawodnika(trenId, req.body)
        .then(result => {
            res.status(200).json({message: 'Trenowanie updated!', tren: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteSztukaZawodnika = (req, res, next) => {
    const trenId = req.params.trenId;

    SztukaZawodnikaRepository.deleteSztukaZawodnika(trenId)
        .then(result => {
            res.status(200).json({message: 'Removed trenowanie', tren: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};