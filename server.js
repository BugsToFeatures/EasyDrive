// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var express = require('./server/config/express');
let mongoose = require('mongoose')
require('dotenv').config();
const path = require('path');

const path = require('path')
var app = express();

const mongoURI = process.env.MONGODB_URI
// const mongoURI = 'mongodb+srv://Sagar:Austin31658@easydriveproject.7xmelkl.mongodb.net/EasyDrive?retryWrites=true&w=majority'

mongoose.connect(mongoURI).then(() => {
    console.log('db has connected!')
}).catch(err => {
    console.log(err)
})
__dirname = path.resolve();
if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}
app.listen(process.env.PORT || 3000);
console.log('Server running at http://localhost:3000/');
module.exports = app;

