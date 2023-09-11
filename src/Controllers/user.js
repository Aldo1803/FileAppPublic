let User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signUp = async (req, res) => {
    try {
        let user = new User();
        user.email = req.body.email;
        user.name = req.body.name;
        user.password = await bcrypt.hash(req.body.password, 10);

        const saved = await user.save();
        res.status(200).send({ saved });

    } catch (err) {
        res.status(500).send({ message: "Server error", error: err.message });
    }
}

const logIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send({ message: "User not found" });

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(401).send({ message: "Incorrect password" });

        const token = jwt.sign({ user }, config.privateKey, { expiresIn: "1d" });
        res.status(200).send({ token });

    } catch (err) {
        res.status(500).send({ message: "Server error", error: err.message });
    }
}

module.exports = { signUp, logIn };
