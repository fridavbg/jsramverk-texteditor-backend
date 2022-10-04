var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
    res.json({
        msg: "Auth page",
    });
});

router.get("/register", (req, res) => {
    res.json({
        msg: "Register page",
    });
});

module.exports = router;
