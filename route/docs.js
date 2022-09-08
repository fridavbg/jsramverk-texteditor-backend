var express = require("express");
var router = express.Router();

const docModel = require("../models/docs");

router.get("/", async (req, res) => {
    const docs = await docModel.getAllDocs();

    return res.json({
        data: docs,
    });
});

router.post("/init", async (req, res) => {
    await docModel.init();

    res.send("Added doc 1 and doc 2 to database");
});

module.exports = router;
