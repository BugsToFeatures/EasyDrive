/*
Student name: Iuliia Chugunova
Student ID: 301150836
File: users.model.js
Date: November 10, 2023
Description: defines data structure of users, allows connect to database and operate on the data 
*/

import mongoose from 'mongoose';

//schema
const usersSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
    required: "Password is required"
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
  cart: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'CartItem', required: true },
    quantity: { type: Number, required: true, default: 1 },
  }],
  salt: {
    type: String
  }
});

//authentication
//create encryption
usersSchema.virtual('password')
 .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password;
  });

//password validation
usersSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
      this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
      this.invalidate('password', 'Password is required');
    }
}, null);


export default mongoose.model('Users', usersSchema);
