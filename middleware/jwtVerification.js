const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ 
            errorCode: 1001, // Custom error code
            message: 'Token is missing or expired' 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            errorCode: 1003, // Custom error code
            message: 'Invalid token' 
        });
    }
};
