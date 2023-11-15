
// Khalid Dawd
//301144241




const User = require('../models/users.model'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JWT, stored in environment variables

exports.signup = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password, 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            //  other fields to be added
        });
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send('Authentication failed');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send('Authentication failed');
        }
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.logout = (req, res) => {
    // Invalidate the token by not providing a new one or handle the logic based on your session management
    res.status(200).send('User logged out successfully');
};

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).send('Not authorized');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const currentUser = await User.findById(decoded.userId);
        if (!currentUser) {
            return res.status(401).send('The user belonging to this token no longer exists');
        }
        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).send('Not authorized, token failed');
    }
};
