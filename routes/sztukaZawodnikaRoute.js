const express = require('express');
const router = express.Router();
const sztukaZawodnikaController = require('../controllers/SztukaZawodnikaController');
router.get('/', sztukaZawodnikaController.showSztukaZawodnikaList);
router.get('/add', sztukaZawodnikaController.showsztukaZawodnikaFormNew);
router.get('/details/:trenId', sztukaZawodnikaController.showsztukaZawodnikaDetails);
router.get('/edit/:trenId', sztukaZawodnikaController.showsztukaZawodnikaFormEdit);

router.post('/add', sztukaZawodnikaController.addSztukaZawodnika);
router.post('/edit', sztukaZawodnikaController.updatesztukaZawodnika);
router.get('/delete/:trenId', sztukaZawodnikaController.deleteSztukaZawodnika);
module.exports = router;
