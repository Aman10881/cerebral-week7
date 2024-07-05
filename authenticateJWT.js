const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Use environment variable in production

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid token' });
    }
};

module.exports = authenticateJWT;
