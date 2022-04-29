const ZawodnikRepository = require('../repository/sequelize/zawodnikRepository');
const SztukaRepository = require('../repository/sequelize/sztukiwalkiRepository');
const SztukaZawodnikaRepository = require('../repository/sequelize/sztukaZawodnikaRepository');

exports.showSztukaZawodnikaList = (req, res, next) => {
    SztukaZawodnikaRepository.getSztukaZawodnika()
        .then(trens => {
            res.render('pages/tren/list', {
                trens: trens,
                pageTitle: 'Lista sztuk zawodnikow',
                navLocation: 'tren'
            });
        });
}

exports.showsztukaZawodnikaFormNew = (req, res, next) => {
    let allZawodnicy, allSztuki;

    ZawodnikRepository.getZawodnik()
        .then(zawodnicy => {
            allZawodnicy = zawodnicy;
            return SztukaRepository.getSztuka();
        }).then(sztuks => {
        allSztuki = sztuks;

        res.render('pages/tren/form', {
            tren: {},
            // trenData: {},
            allZawodnicy: allZawodnicy,
            allSztuki: allSztuki,
            formMode: 'createNew',
            pageTitle: 'Nowe trenowanie',
            btnLabel: 'Dodaj trenowanie',
            formAction: '/tren/add',
            navLocation: 'tren',
            validationErrors: []
        });

    });


}
exports.showsztukaZawodnikaFormEdit = (req, res, next) => {
    const trenId = req.params.trenId;
    let allZawodnicy, allSztuki, allTrenowanie;

    ZawodnikRepository.getZawodnik().then(zawodnicy => {
        allZawodnicy = zawodnicy;
        SztukaRepository.getSztuka()

            .then(sztuks => {
                allSztuki = sztuks;
                SztukaZawodnikaRepository.getSztukaZawodnikaById(trenId)

                    .then(tren => {
                        res.render('pages/tren/form', {

                            allZawodnicy: allZawodnicy,
                            allSztuki: allSztuki,
                            tren: tren,
                            formMode: 'edit',
                            pageTitle: 'Edycja trenowania',
                            btnLabel: 'Edytuj trenowanie',
                            formAction: '/tren/edit',
                            navLocation: 'tren',
                            validationErrors: []
                        });

                    });

            })
    })
}
exports.showsztukaZawodnikaDetails = (req, res, next) => {
    const trenId = req.params.trenId;
    let allZawodnicy, allSztuki, allTrenowanie;

    ZawodnikRepository.getZawodnik().then(zawodnicy => {

        SztukaRepository.getSztuka()

            .then(sztuks => {

                SztukaZawodnikaRepository.getSztukaZawodnikaById(trenId)

                    .then(tren => {
                        res.render('pages/tren/form', {
                            tren: tren,
                            zawodnicy: zawodnicy,
                            sztuks: sztuks,
                            formMode: 'showDetails',
                            pageTitle: 'Szczegóły trenowania',
                            formAction: '',
                            navLocation: 'tren',
                            validationErrors: []
                        });
                    });
            })
    })
}

exports.addSztukaZawodnika = (req, res, next) => {
    let allZawodnicy, allSztuki, error;
    const trenData = {...req.body};
    trenData.zawodnik = parseInt(trenData.zawodnik);
    trenData.sztuka = parseInt(trenData.sztuka);
    SztukaZawodnikaRepository.createSztukaZawodnika(trenData)
        .then(res => {
            res.redirect('/tren');
        }).catch(err => {
        SztukaRepository.getSztuka().then(zawodnicy => {
            allZawodnicy = zawodnicy;
            return SztukaRepository.getSztuka();
        }).then(sztuks => {
            allSztuki = sztuks;
            res.render('pages/tren/form', {
                tren: {},
                allSztuki: allSztuki,
                allZawodnicy: allZawodnicy,
                trenData: trenData,
                formMode: 'createNew',
                pageTitle: 'Dodawanie trenowania',
                btnLabel: 'Dodaj trenowanie',
                formAction: '/tren/add',
                navLocation: 'tren',
                validationErrors: err.errors
            });
        });
    });


}

exports.updatesztukaZawodnika = (req, res, next) => {
    let allZawodnicy, allSztuki, errors;
    const trenId = req.body._id;
    const trenData = {...req.body};

    SztukaZawodnikaRepository.updateSztukaZawodnika(trenId, trenData)
        .then(result => {
            result.redirect('/tren');

        }).catch
    (err => {
        ZawodnikRepository.getZawodnik().then(zawodnicy => {
            errors = err.errors;
            if (errors.length === 0) {
                errors = [];
            }
            allZawodnicy = zawodnicy;

            return SztukaRepository.getSztuka();

        }).then(sztuks => {
            allSztuki = sztuks;


            SztukaZawodnikaRepository.getSztukaZawodnikaById(trenId)
                .then(tren => {
                    res.render('pages/tren/form', {
                        tren: tren,
                        allZawodnicy: allZawodnicy,
                        allSztuki: allSztuki,
                        formMode: 'edit',
                        pageTitle: 'Edycja trenowania',
                        btnLabel: 'Edytuj trenowanie',
                        formAction: '/tren/edit',
                        navLocation: 'tren',
                        validationErrors: error.errors
                    });
                });
        });
    })

}
exports.deleteSztukaZawodnika = (req, res, next) => {
    const trenId = req.params.trenId;
    // const trenData = {...req.body};
    SztukaZawodnikaRepository.deleteSztukaZawodnika(trenId)
        .then(() => {
            res.redirect('/tren')
        })
    /*  .catch(err => {
          res.render('pages/tren/form', {
              tren: trenData,
              formMode: 'delete',
              pageTitle: 'Usuwanie trenowania',
              btnLabel: 'Usuń trenowanie',
              formAction: '/tren/delete',
              navLocation: 'tren',
              validationErrors: []
          });
      });*/
};
