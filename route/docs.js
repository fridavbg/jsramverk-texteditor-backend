var express = require("express");
var router = express.Router();

const docModel = require("../models/docs");

router.get("/", async (req, res) => {
    const docs = await docModel.getAllDocs();

    return res.json({
        data: docs,
    });
});

// router.get("/init", async (req, res) => {
//     res.send("tjo tjim!");
// });

router.post("/init", async (req, res) => {
    await docModel.init();

    res.send("tjo tjim!");
});

// router.post("/init", (req, res) => {
//     res.json({
//         data: "Got a POST request",
//     });
// });

module.exports = router;
