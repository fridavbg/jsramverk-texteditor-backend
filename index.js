require("dotenv").config();

var api_key = process.env.API_KEY;
var domain = process.env.DOMAIN;

var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

var data = {
    from: "Frida <fperssontech@gmail.com>",
    to: "fperssontech@gmail.com",
    subject: "Hello",
    text: "Testing some Mailgun awesomeness!",
};

mailgun.messages().send(data, function (error, body) {
    if (error) {
        console.log(error);
    }
    console.log(body);
});
