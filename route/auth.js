var express = require("express");
var router = express.Router();

const usersModel = require("../models/users");

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

router.post("/register", async (req, res) => {
    const newUser = req.body;

    await usersModel.register(res, newUser);
});

router.post("/login", async (req, res) => {
    const user = req.body;

    await usersModel.login(res, user);
});

module.exports = router;
