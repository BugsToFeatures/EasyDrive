
// Khalid Dawd
//301144241


const User = require('../models/users.model'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res, next) => {

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone
  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        username:username,
        email: email,
        password: hashedPw,
        firstName:firstName,
        lastName:lastName,
        phone: phone,
        cart: []
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: 'User created!', userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};




exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  console.log(password)
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'secretkeyappearshere',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString(), userEmail:loadedUser.email });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};



exports.logout = (req, res) => {
  if(req.userId){
    res.status(200).redirect('/user/login');
  }
  else{
    res.json({"Error":"User Not Logged In"})
  }
};