var express = require("express");
var router = express.Router();

const usersModel = require("../models/users");
const emailModel = require("../models/mail");

router.get("/", (req, res) => {
    // WRAPPA med USER INLOGG!!!!
    return res.json({
        mail: "mail",
    });
});

router.get("/send", async (req, res) => {
    const mail = await emailModel.sendEmail();

    console.log(mail);

    return res.json({
        msg: "Email has been sent",
    });
});

module.exports = router;
