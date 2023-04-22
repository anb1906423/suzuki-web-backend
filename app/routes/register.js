const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

const { checkDuplicateUsernameOrEmail } = require('../middlewares/verify-register.middleware')

router.post('/', registerController.handleRegister);

module.exports = router;