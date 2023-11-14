/*
Student name: Sagar Parmar
Student ID: 301271932
File: shopController.js
Date: November 11, 2023
Description: Major CRUD operation related to vehicles.
*/

const Car = require('../models/cars.model');
const express = require('express');
const router = express.Router();

exports.showAllCars = async (req,res) => {
    await Car.find().then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err);
    })
}

exports.showIndividualCar = (req,res) => {
    Car.findOne({_id:req.params.carId}).then(data => {
        res.json({data})
    }).catch(err => {
        console.log(err)
    })
}



exports.addCar = (req,res) => {

    let make = req.body.make;
    let model = req.body.model;
    let year = req.body.year;
    let type = req.body.type;
    let color = req.body.color;
    let mileage = req.body.mileage;
    let fuelType = req.body.fuelType;
    let transmission = req.body.transmission;
    let dailyPrice = req.body.dailyPrice;
    let available = req.body.available;
    let imageUrl = req.body.imageUrl;

    let datetime = new Date();

    let date = datetime.toISOString().slice(0,10);
    
    // console.log(req.body)

    const car = new Car({
        make:make,
        model:model,
        year:year,
        type:type,
        color:color,
        mileage:mileage,
        fuelType:fuelType,
        transmission:transmission,
        dailyPrice:dailyPrice,
        available:available,
        imageUrl:imageUrl,
        createdAt: date,
        updatedAt: date
    }).save().then((car)=> {
            console.log(car)
            res.redirect('/api/show-all-car');
        }).catch(err => console.log(err));
}

exports.editCar = (req,res) => {
    let make = req.body.make;
    let model = req.body.model;
    let year = req.body.year;
    let type = req.body.type;
    let color = req.body.color;
    let mileage = req.body.mileage;
    let fuelType = req.body.fuelType;
    let transmission = req.body.transmission;
    let dailyPrice = req.body.dailyPrice;
    let available = req.body.available;
    let imageUrl = req.body.imageUrl;

    let datetime = new Date();

    let date = datetime.toISOString().slice(0,10);

    Car.findOne({_id:req.params.carId}).then(car => {
        car.make = make;
        car.model = model;
        car.year = year;
        car.type = type;
        car.color = color;
        car.mileage = mileage;
        car.fuelType = fuelType;
        car.transmission = transmission;
        car.dailyPrice = dailyPrice;
        car.available = available;
        car.imageUrl = imageUrl;
        car.updatedAt = date;

        return car.save().then(result => {
            console.log('UPDATED CAR!');
            res.redirect('/api/show-all-car');
        });
    }).catch(err => {
        console.log(err)
    })
}

exports.deleteCar = (req,res) => {
    Car.deleteOne({"_id":req.params.carId}).then(msg => {
        console.log({msg})
        res.redirect('/api/show-all-car')
    }).catch(err => {
        console.log(err)
    })
}

// exports.addToCart = (req,res) => {
//     const carId = req.params.carId;
//     Car.findById(carId)
//       .then(car => {
//         return req.user.addToCart(car);
//       })
//       .then(result => {
//         console.log(result);
//         res.redirect('/api/show-cart');
//       })
//       .catch(err => {
//         console.log(err)
//       });
// }

// exports.showCart = (req,res) => {
//     req.user
//     .populate('cart.items.carId')
//     .execPopulate()
//     .then(user => {
//       const cars = user.cart.items;
//       res.json(cars)
//     })
//     .catch(err => {
//         console.log(err)
//     });
// }

