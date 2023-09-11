const jwt = require("jsonwebtoken");
const config = require("../config");

exports.Auth = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: "No token provided" });
    }

    try {
        const verified = jwt.verify(token, config.privateKey);
        req.user = verified.coincidence;
        next();
    } catch (err) {
        return res.status(403).send({ message: "Failed to authenticate token", error: err.message });
    }
};
