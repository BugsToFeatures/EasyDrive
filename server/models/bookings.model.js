/*
Student name: Iuliia Chugunova
Student ID: 301150836
File: bookings.model.js
Date: November 10, 2023
Description: defines data structure of bookings, allows connect to database and operate on the data 
*/
const mongoose = require('mongoose');
const Users = require('./users.model');
const Cars = require('./cars.model');
//import mongoose from 'mongoose';
//import Users from './users.model';
//import Cars from './cars.model';

const bookingsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users', 
        required: 'User ID is required' 
    },
    car_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cars', 
        required: 'Car ID is required' 
    },
    startDate: { 
        type: Date, 
        required: 'Start is required' 
    },
    endDate: { 
        type: Date, 
        required: 'End date is required'  
    },
    totalCost: { 
        type: Number, 
        required: 'Total cost is required' 
    },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'completed'], 
        default: 'pending' ,
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

//export default mongoose.model('Bookings', bookingsSchema);
module.exports = mongoose.model('Bookings', bookingsSchema);