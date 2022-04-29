const SztukiWalkiRepository = require('../repository/sequelize/sztukiwalkiRepository');

exports.showSztukiWalkiList = (req, res, next) => {
    SztukiWalkiRepository.getSztuka()
        .then(sztuks => {
            res.render('pages/sztuks/list', {

                sztuks: sztuks,
                navLocation: 'sztuks'
            });
        });
}

exports.showSztukaFormNew = (req, res, next) => {
    res.render('pages/sztuks/form', {
        sztuka: {},
        pageTitle: 'Nowa Sztuka Walki',
        formMode: 'createNew',
        btnLabel: 'Dodaj sztuke walki',
        formAction: '/sztuks/add',
        navLocation: 'sztuks',
        validationErrors: []
    });
}

exports.showSztukaFormEdit = (req, res, next) => {
    const sztukaId = req.params.sztukaId;

    SztukiWalkiRepository.getSztukaById(sztukaId)
        .then(sztuka => {
            res.render('pages/sztuks/form', {
                sztuka: sztuka,
                formMode: 'edit',
                pageTitle: 'Edycja sztuki',
                btnLabel: 'Edytuj sztuke',
                formAction: '/sztuks/edit',
                navLocation: 'sztuks',
                validationErrors: []
            });
        });
}

exports.showSztukaDetails = (req, res, next) => {
    const sztukaId = req.params.sztukaId;

    SztukiWalkiRepository.getSztukaById(sztukaId)
        .then(sztuka => {
            res.render('pages/sztuks/form', {
                sztuka: sztuka,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły sztuki',
                formAction: '',
                navLocation: 'sztuks',
                validationErrors: []
            });
        });
}

exports.addSztuka = (req, res, next) => {
    const sztukaData = {...req.body};

    SztukiWalkiRepository.createSztuka(sztukaData)
        .then(result => {
            res.redirect('/sztuks');
        })
        .catch(err => {
            res.render('pages/sztuks/form', {
                sztuka: sztukaData,
                pageTitle: 'Nowa sztuka',
                formMode: 'createNew',
                btnLabel: 'Dodaj sztuke',
                formAction: '/sztuks/add',
                navLocation: 'sztuks',
                validationErrors: err.errors
            })
        });
};

exports.updateSztuka = (req, res, next) => {
    const sztukaId = req.body._id;
    const sztData = {...req.body};
    let error;

    SztukiWalkiRepository.updateSztuka(sztukaId, sztData)
        .then(result => {
            res.redirect('/sztuks');
        })
        .catch(err => {
            error = err;
            SztukiWalkiRepository.getSztukaById(sztukaId)
                .then(sztuka => {
                    res.render('pages/sztuks/form', {
                        sztuka: sztuka,
                        formMode: 'edit',
                        pageTitle: 'Edycja sztuki',
                        btnLabel: 'Edytuj sztuke',
                        formAction: '/sztuks/edit',
                        navLocation: 'sztuks',
                        validationErrors: error.errors
                    })

                })
        });
};

exports.deleteSztuka = (req, res, next) => {
    const sztukaId = req.params.sztukaId;
    const sztData = {...req.body};

    SztukiWalkiRepository.deleteSztuka(sztukaId)
        .then(() => {
            res.redirect('/sztuks');
        })
        .catch(err => {
            res.render('pages/sztuks/form', {
                sztuka: sztData,
                formMode: 'delete',
                pageTitle: 'Usuń sztuke',
                btnLabel: 'Usuń sztuke',
                formAction: '/sztuks/delete',
                navLocation: 'sztuks',
                validationErrors: []
            })
        });
};