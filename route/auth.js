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

router.post("/register", (req, res) => {
    console.log(req.body);

    res.status(200).send({ data: req.body });
});

module.exports = router;
