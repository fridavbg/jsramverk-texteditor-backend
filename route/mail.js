var express = require("express");
var router = express.Router();

const usersModel = require("../models/users");
const emailModel = require("../models/mail");

router.get("/", (req, res) => {
    return res.json({
        mail: "mail",
    });
});

router.post("/send", async (req, res) => {
    const mailInput = req.body;

    await emailModel.sendEmail(mailInput);

    return res.json({
        msg: "Email sent to " + mailInput.mail,
    });
});

module.exports = router;
