const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

const secretKey = 'your_secret_key'; // Use environment variable in production

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).send({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.protectedRoute = (req, res) => {
    res.send({ message: 'You have accessed a protected route' });
};
