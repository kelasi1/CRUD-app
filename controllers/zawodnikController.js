const ZawodnikRepository = require('../repository/sequelize/zawodnikRepository');
const authUtil = require("../util/authUtils");
exports.showZawodnikList = (req, res, next) => {
    ZawodnikRepository.getZawodnik()
        .then(zawodnicy => {
            res.render('pages/zawodnicy/list', {
                komunikat: false,
                zawodnicy: zawodnicy,
                navLocation: 'zawodnicy'
            });
        });
}

exports.showZawodnikFormNew = (req, res, next) => {
    res.render('pages/zawodnicy/form', {
        zawodnik: {},
        pageTitle: 'Nowy zawodnik',
        formMode: 'createNew',
        btnLabel: 'Dodaj zawodnika',
        formAction: '/zawodnicy/add',
        navLocation: 'zawodnicy',
        validationErrors: []
    });
}

exports.showZawodnikFormEdit = (req, res, next) => {
    const zawodnikId = req.params.zawodnikId;

    ZawodnikRepository.getZawodnikById(zawodnikId)
        .then(zawodnik => {
            res.render('pages/zawodnicy/form', {
                zawodnik: zawodnik,
                formMode: 'edit',
                pageTitle: 'Edycja zawodnika',
                btnLabel: 'Edytuj zawodnika',
                formAction: '/zawodnicy/edit',
                navLocation: 'zawodnicy',
                validationErrors: []
            });
        });
}

exports.showZawodnikDetails = (req, res, next) => {
    const zawodnikId = req.params.zawodnikId;

    ZawodnikRepository.getZawodnikById(zawodnikId)
        .then(zawodnik => {
            res.render('pages/zawodnicy/form', {
                zawodnik: zawodnik,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły zawodnika',
                formAction: '',
                navLocation: 'zawodnicy',
                validationErrors: []
            });
        });
}

exports.addZawodnik = (req, res, next) => {
    const zawodnikData = {...req.body};

    ZawodnikRepository.createZawodnik(zawodnikData)
        .then(result => {
            res.redirect('/zawodnicy');
        })
        .catch(err => {
            res.render('pages/zawodnicy/form', {
                komunikat: true,
                zawodnik: zawodnikData,
                pageTitle: 'Nowy zawodnik',
                formMode: 'createNew',
                btnLabel: 'Dodaj zawodnika',
                formAction: '/zawodnicy/add',
                navLocation: 'zawodnicy',
                validationErrors: err.errors
            });
        });
};

exports.updateZawodnik = (req, res, next) => {
    const zawodnikId = req.body._id;
    const zawodnikData = {...req.body};
    let errors;

    ZawodnikRepository.updateZawodnik(zawodnikId, zawodnikData)
        .then(result => {
            res.redirect('/zawodnicy');
        })
        .catch(err => {

            error = err;
            errors = err.errors;
            if (errors.length === 0) {
                errors = [];
                ZawodnikRepository.getZawodnikById(zawodnikId)
                    .then(zawodnik => {
                        res.render('pages/zawodnicy/form', {

                            zawodnik: zawodnikData,
                            formMode: 'edit',
                            pageTitle: 'Edycja zawodnika',
                            btnLabel: 'Edytuj zawodnika',
                            formAction: '/zawodnicy/edit',
                            navLocation: 'zawodnicy',
                            validationErrors: errors
                        });

                    })
            }
            ;
        });
};

exports.deleteZawodnik = (req, res, next) => {
    const zawodnikId = req.params.zawodnikId;
    const zawodnikData = {...req.body};

    ZawodnikRepository.deleteZawodnik(zawodnikId)
        .then(() => {
            res.redirect('/zawodnicy');
        })
        .catch(err => {
            res.render('pages/zawodnicy/form', {

                zawodnik: zawodnikData,
                formMode: 'delete',
                pageTitle: 'Usuń zawodnika',
                btnLabel: 'Usuń zawodnika',
                formAction: '/zawodnicy/delete',
                navLocation: 'zawodnicy',
                validationErrors: []
            });
        });
};