const jwt = require("jsonwebtoken");
const keys = require("../config");

exports.TokenVerify = async (req, res) => {
    const privateKey = keys.privateKey;
    const token = req.headers.token;

    try {
        const verified = jwt.verify(token, privateKey);
        return res.status(200).send({ message: true });
    } catch (err) {
        return res.status(403).send({ message: false, error: "Invalid token." });
    }
}
