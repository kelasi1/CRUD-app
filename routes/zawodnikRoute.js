const express = require('express');
const router = express.Router();
const zawodnikController = require('../controllers/zawodnikController');
router.get('/', zawodnikController.showZawodnikList);
router.get('/add', zawodnikController.showZawodnikFormNew);
router.get('/edit/:zawodnikId', zawodnikController.showZawodnikFormEdit);
router.get('/details/:zawodnikId', zawodnikController.showZawodnikDetails);

router.post('/add', zawodnikController.addZawodnik);
router.post('/edit', zawodnikController.updateZawodnik);
router.get('/delete/:zawodnikId', zawodnikController.deleteZawodnik);
module.exports = router;
