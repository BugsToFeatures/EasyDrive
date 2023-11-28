/*
Student name: Iuliia Chugunova
Student ID: 301150836
File: bookings.model.js
Date: November 10, 2023
Description: defines data structure of bookings, allows connect to database and operate on the data 
*/
const mongoose = require('mongoose');
const User = require('./users.model');
const Car = require('./cars.model');

mongoose.Promise = global.Promise

const bookingsSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: 'User ID is required' 
    },
    car_id: { 
        type: mongoose.Types.ObjectId, 
        Ref:'Car',
        required: 'Car ID is required' 
    },
    make: { 
        type: String, 
        required: 'Make is required'
    },
    model: { 
        type: String, 
        required: 'Model is required' 
    },
    totalCost: { 
        type: Number, 
        required: 'Total cost is required' 
    },
    status: { 
        type: String, 
        required: 'Booking status is required' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});

module.exports = mongoose.model('Bookings', bookingsSchema);