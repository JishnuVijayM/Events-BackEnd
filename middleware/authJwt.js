const jwt = require('jsonwebtoken')

exports.authenticateJWT = (req, res, next) => {

    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Access denied, token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("decoded", decoded);
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}