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
    // (req, res, next) => usersModel.checkToken(req, res, next),
    async (req, res) => {
        const mailInput = req.body;

        await emailModel.sendEmail(mailInput);

        return res.json({
            msg: "Email sent to " + mailInput.email,
        });
    }
);

module.exports = router;
