exports.checkSuperAdminRole = (req, res, next) => {
    if (req.user && req.user.role === 'super_admin') {
        
        return next();
    }
    return res.status(403).json({ message: "Access denied, insufficient privileges" });
};