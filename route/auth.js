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

    // console.log("newUser:", newUser);

    const result = await usersModel.register(res, newUser);

    res.status(201).json({ data: result });
});

module.exports = router;
