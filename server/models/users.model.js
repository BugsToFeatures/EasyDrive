/*
Student name: Iuliia Chugunova
Student ID: 301150836
File: users.model.js
Date: November 10, 2023
Description: defines data structure of users, allows connect to database and operate on the data 
*/

//import mongoose from 'mongoose';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//schema
const usersSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is required"
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required",
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
    password: {
      type: String,
      required: 'Password is required'
    },   
  firstName: {
    type: String,
    trim: true,
    required: "First name is required"
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last name is required"
  },
  phone: {
    type: String,
    trim: true,
    required: "Phone number name is required",
    match: [/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, 'Please enter valid phone number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  cart: [Schema.Types.ObjectId]
});



module.exports = mongoose.model('User', usersSchema);
