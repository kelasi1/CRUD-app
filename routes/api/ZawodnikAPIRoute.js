const express = require('express');
const router = express.Router();

const ZawodnikApiController = require('../../api/ZawodnikAPI');

router.get('/', ZawodnikApiController.getZawodnik);
router.get('/:zawodnikId', ZawodnikApiController.getZawodnikById);
router.post('/', ZawodnikApiController.createZawodnik);
router.put('/:zawodnikId', ZawodnikApiController.updateZawodnik);
router.delete('/:zawodnikId', ZawodnikApiController.deleteZawodnik);

module.exports = router;