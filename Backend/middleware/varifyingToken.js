const jwt = require('jsonwebtoken');

const verifyingToken = (req, res, next) => {
    const token = req.header('token');
    
    if (token) {
        try {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(verifyToken.id)
            req.user = verifyToken.id;
        } catch (error) {
            console.error(error);
        }
    }
    else{
        return res.status(404).json({"error":"Token not found"})
    }

    next();
};

module.exports = verifyingToken;
