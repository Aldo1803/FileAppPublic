const TempObj = require("../Models/tempObj");
const img_uploader = require("../services/img-uploader");
const fs = require("fs");
const path = require("path");

const createObj = async (req, res) => {
    try {
        let obj = new TempObj();
        obj.user = req.user._id;
        obj.text = req.body.text;

        if (req.files && req.files.file) {
            const fileName = req.files.file;
            const filePath = path.join('uploads/', fileName.name);
            const mimetype = fileName.mimetype;

            await fileName.mv(filePath);
            obj.file = `https://[YOUR-BUCKET-NAME].s3.[YOUR-REGION].amazonaws.com/${fileName.name}`;
            img_uploader.uploadFile(fileName.name, filePath, mimetype);

            fs.rmSync(filePath);
        }

        const saved = await obj.save();
        res.status(200).send({ saved });

    } catch (err) {
        res.status(500).send({ message: "Server error", error: err.message });
    }
};

const getObjs = async (req, res) => {
    try {
        const objs = await TempObj.find({ user: req.user._id });
        res.status(200).send({ objs });

    } catch (err) {
        res.status(500).send({ message: "Server error", error: err.message });
    }
};

const getObj = async (req, res) => {
    try {
        const obj = await TempObj.findById(req.params.id);
        if (!obj) return res.status(404).send({ message: "Object not found" });

        res.status(200).send({ obj });

    } catch (err) {
        res.status(500).send({ message: "Server error", error: err.message });
    }
};

module.exports = { createObj, getObjs, getObj };
