const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const isLoggedIn = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = {
    isLoggedIn
};
