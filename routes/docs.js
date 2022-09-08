var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    // const docs = await docMModel.getAllDocs();
    const data = {
        data: {
            msg: "Documents",
        },
    };

    res.json(data);
});

module.exports = router;
