const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authorModel = require('../models/authorModel');

const signup = async (req, res) => {
    try {
        const { fname, lname, title, email, password } = req.body;

        // Check if email already exists
        const existingAuthor = await authorModel.findOne({ email });
        if (existingAuthor) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new author
        const author = new authorModel({
            fname,
            lname,
            title,
            email,
            password: hashedPassword
        });

        const authorCreated = await author.save();
        res.status(201).json({ data: authorCreated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the author by email
        const author = await authorModel.findOne({ email });
        if (!author) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, author.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: author._id }, 'your_jwt_secret', { expiresIn: '1h' });

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true, secure: false }); // set secure to true in production

        res.json({ message: 'Signin successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// A protected route example
const protectedRoute = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, 'your_jwt_secret');
        req.author = verified;

        // Proceed with your protected route logic
        res.json({ message: 'You have access to this route' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = {
    signup,
    signin,
    protectedRoute
};
