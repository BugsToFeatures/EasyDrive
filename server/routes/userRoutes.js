// Khalid Dawd
//301144241

const express = require('express');
const userController = require('../controllers/userController'); 
const router = express.Router();

router.post('/users/signup', userController.signup);
router.post('/users/login', userController.login);
router.get('/users/logout', userController.logout);

module.exports = router;
