require("dotenv").config();

const api_key = process.env.API_KEY;
const domain = process.env.DOMAIN;

const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

function getMessage(email = "fperssontech@gmail.com") {
    const body = "This is a test email using Mailgun from Node.js";

    return {
        from: "Frida <fperssontech@gmail.com>",
        to: email,
        subject: "Hello",
        text: body,
        html: `<h1>${body}</h1>`,
    };
}

async function sendEmail() {
    try {
        await mailgun.messages().send(getMessage(), function (error, body) {
            if (error) {
                console.log(error);
            }
            console.log(body);
        });
    } catch (error) {
        console.error("Error sending test email");
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
}

module.exports = { sendEmail };

