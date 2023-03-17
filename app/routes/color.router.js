const express = require('express')
const router = express.Router()

const colorController = require('../controllers/colorController')

router.post('/create', colorController.createColor)
router.delete('/delete/:id', colorController.deleteColor)
router.get('/get-all', colorController.getAllColors)

module.exports = router