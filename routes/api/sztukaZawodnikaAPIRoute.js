const express = require('express');
const router = express.Router();

const SztukaZawodnikaApiController = require('../../api/sztukaZawodnikaAPI');

router.get('/', SztukaZawodnikaApiController.getSztukaZawodnika);
router.get('/:trenId', SztukaZawodnikaApiController.getSztukaZawodnikaById);
router.post('/', SztukaZawodnikaApiController.createSztukaZawodnika);
router.put('/:trenId', SztukaZawodnikaApiController.updateSztukaZawodnika);
router.delete('/:trenId', SztukaZawodnikaApiController.deleteSztukaZawodnika);

module.exports = router;