require("dotenv").config();

const apiKey = process.env.API_KEY;
const domain = process.env.DOMAIN;

const mailgun = require("mailgun-js")({ apiKey: apiKey, domain: domain });

function getMessage(email) {
    const body = "You have been invited to edit a Document";

    return {
        from: "Frida <fperssontech@gmail.com>",
        to: email.mail,
        subject: "Texteditor invite",
        text: body,
        html: `
            <h1>${body}</h1>
            <p>Follow the link below to get to the editor</p>
            <a href="https://www.student.bth.se/~frpe21/editor">Text Editor</a>
        `,
    };
}

async function sendEmail(mailInput) {
    try {
        await mailgun
            .messages()
            .send(getMessage(mailInput), function (error, body) {
                if (error) {
                    // RETURNERA TEXT
                    console.log(error);
                }
                // RETURNERA TEXT
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
