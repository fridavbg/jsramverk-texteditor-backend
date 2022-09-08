var express = require("express");
var router = express.Router();

const docModel = require("../models/docs");

router.get("/", async (req, res) => {
    const docs = await docModel.getAllDocs();

    return res.json({
        data: docs,
    });
});

router.post("/", async (req, res) => {
    const newDoc = req.body;

    const result = docModel.insertDoc(newDoc);
    res.status(201).json(result);
});

router.get("/init", async (req, res) => {
    res.send("tjo tjim!");
});

module.exports = router;
