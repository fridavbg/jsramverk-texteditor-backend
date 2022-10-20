require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// GRAPHQL
const visual = true;
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const RootQueryType = require("./graphql/root.js");

// ROUTES
const docs = require("./route/docs.js");
const auth = require("./route/auth.js");
const mail = require("./route/mail.js");

const app = express();
const httpServer = require("http").createServer(app);

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

const schema = new GraphQLSchema({
    query: RootQueryType,
});

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: visual, // Visual är satt till true under utveckling
    })
);

app.use("/docs", docs);
app.use("/auth", auth);
app.use("/mail", mail);

app.get("/", (req, res) => {
    res.json({
        msg: "Main page",
    });
});

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.sockets.on("connection", function (socket) {
    console.log(socket.id);
    socket.on("create", function (room) {
        socket.join(room);
        console.log("Room exists with ID:");
        console.log(room);
    });

    socket.on("update", function (data) {
        socket.to(data["_id"]).emit("update", data);
        console.log(data["_id"]);

        console.log("DATA");
        console.log(data);
    });
});

const server = httpServer.listen(port, () => {
    console.log("Document api listening on port " + port);
});

module.exports = server;
