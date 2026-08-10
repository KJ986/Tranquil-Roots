const ownerOnly = (req, res, next) => {
    if (req.user && req.user.role === "owner") {
        return next();
    }

    return res.status(403).json({
        message: "Owner access required.",
    });
};

module.exports = ownerOnly;