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

router.post("/foo", (req, res) => {
    res.status(200).send({ msg: "Foo!" });
});

router.post("/register", (req, res) => {
    const newUser = req.body;

    res.json({
        newUser: newUser,
    });
});

module.exports = router;
