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
const isAuth = require('../middleware/is-auth')

router.get('/show-all-cars',shopController.showAllCars);
router.post('/add-car',isAuth,shopController.addCar);
router.put('/edit-car/:carId',isAuth,shopController.editCar);
router.delete('/delete-car/:carId',isAuth,shopController.deleteCar);
router.get('/show-car/:carId',isAuth,shopController.showIndividualCar);
router.post('/add-to-cart/:carId',isAuth,shopController.addToCart);
router.get('/show-cart',isAuth,shopController.showCart);
router.delete('/remove-from-cart/:carId',isAuth,shopController.removeFromCart)


module.exports = router