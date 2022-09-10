var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

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

router.get("/edit/(:id)", async (req, res) => {
    const result = await docModel.getOneDoc(req.params.id);
    res.status(201).json({ data: result });
});

router.put("/edit/(:id)", async (req, res) => {
    const updateDoc = req.body;
    const result = await docModel.updateDoc(req.params.id, updateDoc);
    res.status(201).json({ data: result });
});

router.post("/init", async (req, res) => {
    await docModel.init();

    res.send("Added some docs to the database");
});

module.exports = router;
