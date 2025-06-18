const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Authorization not provided" });
    }

    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
