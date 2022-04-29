const zawodnikRepository = require('../repository/sequelize/zawodnikRepository');

exports.getZawodnik = (req, res, next) => {
    zawodnikRepository.getZawodnik()
        .then(zawodnicy => {
            res.status(200).json(zawodnicy);
        })
        .catch(err => {
            console.log(err);
        });
    
};

exports.getZawodnikById = (req, res, next) => {
    const zawodnikId = req.params.zawodnikId;

    zawodnikRepository.getZawodnikById(zawodnikId)
        .then(zawodnik => {
            if (!zawodnik) {
                res.status(404).json({
                    message: 'zawodnik with id: ' + zawodnikId + ' not found'
                })
            } else {
                res.status(200).json(zawodnik);
            }
        });
};

exports.createZawodnik = (req, res, next) => {
    zawodnikRepository.createZawodnik(req.body)
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

exports.updateZawodnik = (req, res, next) => {
    const zawodnikId = req.params.zawodnikId;

    zawodnikRepository.updateZawodnik(zawodnikId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Zawodnik updated!', zawodnik: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteZawodnik = (req, res, next) => {
    const zawodnikId = req.params.zawodnikId;

    zawodnikRepository.deleteZawodnik(zawodnikId)
        .then(result => {
            res.status(200).json({ message: 'Deleted zawodnik', zawodnik: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};