const express = require('express');
const router = express.Router();

const SztukiWalkiApiController = require('../../api/sztukiwalkiAPI');

router.get('/', SztukiWalkiApiController.getSztuka);
router.get('/:sztukaId', SztukiWalkiApiController.getSztukaById);
router.post('/', SztukiWalkiApiController.createSztuka);
router.put('/:sztukaId', SztukiWalkiApiController.updateSztuka);
router.delete('/:sztukaId', SztukiWalkiApiController.deleteSztuka);

module.exports = router;