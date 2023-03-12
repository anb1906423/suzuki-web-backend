const express = require('express');
const router = express.Router();
const overviewController = require('../controllers/overviewController');

router.post('/create', overviewController.handleCreateOverview);
router.put('/update', overviewController.updateOverview);
router.get('/get-all', overviewController.getAllOverview);

module.exports = router;