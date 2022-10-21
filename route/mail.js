var express = require("express");
var router = express.Router();

const usersModel = require("../models/users");
const emailModel = require("../models/mail");

router.get("/", (req, res) => {
    return res.json({
        mail: "mail",
    });
});

router.post(
    "/send",
    (req, res, next) => usersModel.checkToken(req, res, next),
    async (req, res) => {
        const mailInput = req.body;

        const mail = await emailModel.sendEmail(mailInput);

        console.log("Mail confirmation:");
        console.log(mail);

        return res.json({
            msg: "Email has been sent",
            mail: mailInput,
        });
    }
);

module.exports = router;
