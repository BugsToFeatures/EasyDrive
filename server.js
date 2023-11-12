process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('./server/config/express');
let mongoose = require('mongoose')
var app = express();

const mongoURI = 'mongodb+srv://ychuguno:12345easydrive@easydriveproject.7xmelkl.mongodb.net/EasyDrive?retryWrites=true&w=majority';

mongoose.connect(mongoURI).then(() => {
    console.log('db has connected!')
}).catch(err => {
    console.log(err)
})
app.listen(process.env.PORT || 3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');
