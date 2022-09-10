var express = require("express");
var router = express.Router();
var ObjectID = require("mongodb").ObjectID;

const docModel = require("../models/docs");

router.get("/", async (req, res) => {
    const docs = await docModel.getAllDocs();

    return res.json({
        data: docs,
    });
});

router.post("/create", async (req, res) => {
    const newDoc = req.body;

    const result = await docModel.insertDoc(newDoc);
    res.status(201).json({ data: result });
});

router.get("/view", (req, res) => {
    const id = req.params.id;
    const idToFindBy = { _id: new ObjectID(id) };
    res.send(idToFindBy);
});

router.post("/init", async (req, res) => {
    await docModel.init();

    res.send("Added some docs to the database");
});

module.exports = router;
