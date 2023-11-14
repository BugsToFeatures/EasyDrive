/*
Student name: Iuliia Chugunova
Student ID: 301150836
File: cars.model.js
Date: November 10, 2023
Description: defines data structure of cars schema, allows connect to database and operate on the data 
*/

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const carsSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
  make: { 
    type: String, 
    required: 'Make is required'
    },
  model: { 
    type: String, 
    required: 'Model is required' 
    },
  year: { 
    type: Number, 
    required: 'Year is required'
    },
  type: { 
    type: String, 
    required: 'Type is required' 
    },
  color: { 
    type: String 
    },
  mileage: { 
    type: Number, 
    required: 'Mileage is required'
    },
  fuelType: { 
    type: String, 
    required: 'Fuel type is required' 
    },
  transmission: { 
    type: String, 
    required: 'Transmission is required' 
    },
  dailyPrice: { 
    type: Number, 
    required: 'Daily price is required'
    },
  available: { 
    type: Boolean, 
    default: true,
    required: 'Availability is required' 
    },
  imageUrl: { 
    type: String 
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

//module.exports =  mongoose.model('Car', carsSchema);
module.exports = mongoose.model('Car', carsSchema);