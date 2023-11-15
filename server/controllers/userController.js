
// Khalid Dawd
//301144241


const User = require('../models/users.model'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET; // Secret key for JWT, stored in environment variables

// Signup Function
exports.signup = async (req, res) => {
    try {
        // Create a new user using the virtual 'plainPassword' field
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            plainPassword: req.body.password, // Use 'plainPassword' to trigger password hashing
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            // other fields as necessary
        });
        await user.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || "Internal Server Error");
    }
}

// Login Function
exports.login = async (req, res) => {
    try {
        // Log the entire request body
        console.log("Request body:", req.body);

        // Retrieve the login identifier (could be either username or email)
        const loginIdentifier = req.body.loginIdentifier; 

        // Find the user by either email or username
        const user = await User.findOne({
            $or: [{ email: loginIdentifier }, { username: loginIdentifier }]
        });

        console.log("Retrieved user:", user);

        if (!user) {
            return res.status(401).send('Authentication failed: User not found');
        }

        console.log("Stored hashed password:", user.password);
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        
        if (isMatch) {
            // Passwords match, so sign the JWT token and send it in the response
            const token = jwt.sign(
                { 
                    username: user.username, 
                    email: user.email 
                }, 
                JWT_SECRET, 
                { expiresIn: '1h' }
            );

            // Send the token in the response
            return res.status(200).send({ token });
        } else {
            // Passwords do not match, send an authentication failed message
            return res.status(401).send('Authentication failed: Password mismatch');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};



// Logout Function
exports.logout = (req, res) => {
    // Logout logic (Note: JWT tokens are stateless, so this might just be informational)
    res.status(200).send('User logged out successfully');
};

// Middleware to Protect Routes
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
