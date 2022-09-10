var express = require("express");
var router = express.Router();

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


router.get("/update", (req, res) => {
    // const id = req.params.id;
    // const details = { _id: new ObjectID(id) };
    res.send("details");
});

router.post("/init", async (req, res) => {
    await docModel.init();

    res.send("Added some docs to the database");
});

module.exports = router;
