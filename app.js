require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const docs = require("./route/docs.js");

const app = express();
const port = process.env.PORT || 1337;

app.use(cors());
app.options("*", cors());

app.disable("x-powered-by");

// don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
    // use morgan to log at command line
    app.use(morgan("combined")); // 'combined' outputs the Apache style LOGs
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/docs", docs);

// Add a route
app.get("/", (req, res) => {
    res.json({
        msg: "Main page",
    });
});

// Start up server
const server = app.listen(port, () =>
    console.log(`Example API listening on port ${port}!`)
);

module.exports = server;
