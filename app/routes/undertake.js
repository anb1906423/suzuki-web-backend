const UndertakeController = require('../controllers/undertakeController')
const express = require('express')
const router = express.Router()

router.post('/create', UndertakeController.createUndertake)
router.put('/update', UndertakeController.updateUndertake)
router.get('/get-all', UndertakeController.getAllUndertake)

module.exports = router