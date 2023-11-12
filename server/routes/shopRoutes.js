/*
Student name: Sagar Parmar
Student ID: 301271932
File: shopRoutes
Date: November 10, 2023
Description: made various routers for major CRUD operations 
*/

const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shopController')

router.get('/show-all-car',shopController.showAllCars);
router.post('/add-car',shopController.addCar);
router.put('/edit-car/:carId',shopController.editCar);
router.delete('/delete-car/:carId',shopController.deleteCar);
router.get('/show-car/:carId',shopController.showIndividualCar)
// router.post('/add-to-cart/:carId');
// router.get('/show-cart');


module.exports = router