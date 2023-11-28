/*
Student name: Sagar Parmar
Student ID: 301271932
File: shopController.js
Date: November 11, 2023
Description: Major CRUD operation related to vehicles.
*/

const Car = require('../models/cars.model');
const User = require('../models/users.model')
const Bookings = require('../models/bookings.model.js')
const express = require('express');
const mongoose = require('mongoose');


exports.showAllCars = async (req,res) => {
    await Car.find().then(data => {
        res.json(data)
    }).catch(err => {
        console.log(err);
    })
}

exports.showIndividualCar = (req,res) => {
    if(req.userId){
        Car.findOne({_id:req.params.carId}).then(data => {
            res.json({data})
        }).catch(err => {
            console.log(err)
        })
    }
    else{
        res.json({"Error":"User Not Logged In"})
    }
}



exports.addCar = (req,res) => {

    if(req.userId){
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
                res.redirect('/api/show-all-cars');
            }).catch(err => console.log(err));
    }
    else{
        res.json({"Error":"User Not Logged In"})
    }
}

exports.editCar = (req,res) => {
    if(req.userId){
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
                res.redirect('/api/show-all-cars');
            });
        }).catch(err => {
            console.log(err)
        })
    }
    else{
        res.json({"Error":"User Not Logged In"})
    }
}

exports.deleteCar = (req, res) => {
    if(req.userId){
        const carId = req.params.carId;
        User.updateMany(
            { cart: carId },
            { $pull: { cart: carId } }
        )
        .then(() => {
            return Car.deleteOne({ "_id": carId });
        })
        .then(() => {
            return Booking.deleteMany({ car: carId });
        })
        .then(() => {
            console.log(`Car with ID ${carId} deleted`);
            res.redirect('/api/show-all-cars');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
    }
    else{
        res.json({"Error":"User Not Logged In"});
    }
};

exports.addToCart = async (req,res) => {
    if(req.userId){
        const carId = req.params.carId;
        Car.findOne({_id:carId})
          .then(car => {
            console.log(car)
            User.findOne({_id:req.userId}).then(user => {
                user.cart.push(car);
                console.log({"msg":"Car Has Been Added","Cart":user.cart})
                res.redirect('/api/show-cart');
                return user.save();
              }).catch(err => {
                console.log(err);
              });
            
          })
          .catch(err => {
            console.log(err)
          });
    }
    else{
        res.json({"Error":"User Not Logged In"})
    }
    
}

exports.removeFromCart = (req,res) => {
    if(req.userId){
        const carId = req.params.carId;
        console.log(req.userId)
        User.findOne({_id:req.userId})
          .then(user => {
            console.log(user)
            const index = user.cart.indexOf(carId);
                    if (index > -1) {
                        user.cart.splice(index, 1);
                    }
                    console.log(user.cart);
                    return user.save();
            })
          .then(result => {
            res.redirect('/api/show-cart');
          })
          .catch(err => {
            console.log(err)
          });
    }
    else{
        res.json({"Error":"User Not Logged In"})
    }
}

exports.showCart = async (req, res) => {
    if (req.userId) {
        try {
            const user = await User.findOne({ _id: req.userId });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const carPromises = user.cart.map(item => Car.findById(item));
            const cars = await Promise.all(carPromises);

            res.json(cars);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    } else {
        res.status(401).json({ error: "User not logged in" });
    }
};

exports.showBookings = async (req, res) => {
    if (req.userId) {
        try {
            const user = await User.findOne({ _id: req.userId });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const bookings = await Bookings.find({ user_id: user._id })
                                           .populate('car_id')
                                           .exec();
 
            const bookingDetails = bookings.map(booking => ({
                car_Id: booking.car_id,
                car: booking.make+" "+booking.model, 
                totalCost: booking.totalCost,
                status: booking.status,
                createdAt: booking.createdAt
            }));
            console.log(bookingDetails)
            res.json(bookingDetails);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    } else {
        res.status(401).json({ error: "User not logged in" });
    }
};

exports.bookCar = async (req, res) => {
    if (req.userId) {
        try {
            const { carId } = req.params;

            console.log(carId)
            const car = await Car.findById(carId);
            if (!car) {
                return res.status(404).json({ error: "Car not found" });
            }

            const user = await User.findOne({ _id: req.userId });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            if (!user.cart.includes(carId)) {
                return res.status(400).json({ error: "Car is not in the user's cart" });
            }
            const newBooking = new Bookings({
                user_id: req.userId,
                car_id: carId,
                make:car.make,
                model:car.model,
                totalCost: car.dailyPrice,
                status: "Booked"
            });

            await newBooking.save();

            user.cart = user.cart.filter(item => item.toString() !== carId.toString());
            await user.save();

            res.status(201).json({
                message: "Car booked successfully",
                carDetails: car,
                bookingDetails: newBooking
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
        }
    } else {
        res.status(401).json({ error: "User not logged in" });
    }
};

exports.getProfile = (req, res, next) => {
    const userId = req.userId;
    console.log(userId);
    User.findOne({ _id: req.userId })
        .then(user => {
            if (!user) {
                const error = new Error('User not found.');
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                createdAt:user.createdAt
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
