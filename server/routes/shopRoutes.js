/*
Student name: Sagar Parmar
Student ID: 301271932
File: shopRoutes
Date: November 10, 2023
Description: made various routers for major CRUD operations 
*/

const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shopController');
const userController = require('../controllers/userController');

router.get('/show-all-cars',shopController.showAllCars);
router.post('/add-car',shopController.addCar);
router.put('/edit-car/:carId',shopController.editCar);
router.delete('/delete-car/:carId',shopController.deleteCar);
router.get('/show-car/:carId',shopController.showIndividualCar);
router.post('/signup', userController.signup);
router.get('/login', userController.login)
// router.post('/add-to-cart/:carId');
// router.get('/show-cart');


module.exports = router