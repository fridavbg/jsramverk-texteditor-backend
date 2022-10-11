var express = require("express");
var router = express.Router();

const usersModel = require("../models/users");

router.get("/", async (req, res) => {
    const users = await usersModel.getAllUsers();

    res.json({
        msg: "Auth page",
        users: users,
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
