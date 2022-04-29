const sztukiwalkiRepository = require('../repository/sequelize/sztukiwalkiRepository');

exports.getSztuka = (req, res, next) => {
    sztukiwalkiRepository.getSztuka()
        .then(sztuks => {
            res.status(200).json(sztuks);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSztukaById = (req, res, next) => {
    const sztukaId = req.params.sztukaId;

    sztukiwalkiRepository.getSztukaById(sztukaId)
        .then(sztuka => {
            if (!sztuka) {
                res.status(404).json({
                    message: 'Sztuka with id: ' + sztukaId + ' not found'
                })
            } else {
                res.status(200).json(sztuka);
            }
        });
};

exports.createSztuka = (req, res, next) => {
    sztukiwalkiRepository.createSztuka(req.body)
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

exports.updateSztuka = (req, res, next) => {
    const sztukaId = req.params.sztukaId;

    sztukiwalkiRepository.updateSztuka(sztukaId, req.body)
        .then(result => {
            res.status(200).json({message: 'Sztuka updated!', sztuka: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteSztuka = (req, res, next) => {
    const sztukaId = req.params.sztukaId;

    sztukiwalkiRepository.deleteSztuka(sztukaId)
        .then(result => {
            res.status(200).json({message: 'Removed sztuka', sztuka: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};