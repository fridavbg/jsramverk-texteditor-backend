const express = require("express");
const app = express();

const port = 1337;

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World",
        },
    };

    res.json(data);
});

// Testing routes with method
app.get("/doc", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request",
        },
    });
});

app.post("/doc", (req, res) => {
    res.json({
        data: {
            msg: "Got a POST request",
        },
    });
});

app.put("/doc", (req, res) => {
    res.json({
        data: {
            msg: "Got a PUT request",
        },
    });
});

app.delete("/doc", (req, res) => {
    res.json({
        data: {
            msg: "Got a DELETE request",
        },
    });
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
