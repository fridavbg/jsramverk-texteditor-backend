var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    res.json({
        msg: "Auth page",
    });
});

module.exports = router;
