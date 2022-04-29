const express = require('express');
const router = express.Router();
const sztukiController = require('../controllers/sztukiController');
router.get('/', sztukiController.showSztukiWalkiList);
router.get('/add', sztukiController.showSztukaFormNew);
router.get('/details/:sztukaId', sztukiController.showSztukaDetails);
router.get('/edit/:sztukaId', sztukiController.showSztukaFormEdit);

router.post('/add', sztukiController.addSztuka);
router.post('/edit', sztukiController.updateSztuka);
router.get('/delete/:sztukaId', sztukiController.deleteSztuka);
module.exports = router;
