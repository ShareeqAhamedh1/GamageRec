const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/adminLogin', authController.adminLogin);
router.post('/edit', authController.edit);

module.exports = router;
