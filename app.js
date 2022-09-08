const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const docs = require("./routes/docs");

const port = 1337;

app.use(cors());
app.options("*", cors());

app.disable("x-powered-by");

app.set("view engine", "ejs");

// don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
    // use morgan to log at command line
    app.use(morgan("combined")); // 'combined' outputs the Apache style LOGs
}

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Mainpage",
        },
    };

    res.json(data);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/docs", docs);

// Start up server
const server = app.listen(port, () =>
    console.log(`Example API listening on port ${port}!`)
);

module.exports = server;
