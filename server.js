process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('./server/config/express');
let mongoose = require('mongoose')
var app = express();

const mongoURI = 'mongodb://127.0.0.1:27017/EasyDrive';

mongoose.connect(mongoURI,{
    useNewUrlParser: true
}).then(() => {
    console.log('db has connected!')
}).catch(err => {
    console.log(err)
})
app.listen(process.env.PORT || 3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');
