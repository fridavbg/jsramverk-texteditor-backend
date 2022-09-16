/* global before it describe */
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();

chai.use(chaiHttp);

const database = require("../db/database.js");
const collectionName = "crowd";

describe("Documents ", () => {
    before(async () => {
        const db = await database.getDb();

        db.db
            .listCollections({ name: collectionName })
            .next()
            .then(async function (info) {
                if (info) {
                    await db.collection.drop();
                }
            })
            .catch(function (err) {
                console.error(err);
            })
            .finally(async function () {
                await db.client.close();
            });
    });
});

describe("Main", () => {
    describe("GET /", () => {
        it("200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });
});

describe("Document", () => {
    describe("GET /docs", () => {
        it("200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/docs")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.equal(0);
                    done();
                });
        });
    });
});

describe("POST /docs/create", () => {
    it("201 Creating new document", (done) => {
        let doc = {
            title: "Test",
            description: "Testy test test",
        };

        chai.request(server)
            .post("/docs/create")
            .send(doc)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.an("object");
                res.body.should.have.property("data");
                res.body.data.should.have.property("title");
                res.body.data.title.should.equal("Test");

                done();
            });
    });

    it("200 HAPPY PATH", (done) => {
        chai.request(server)
            .get("/docs")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("array");
                // res.body.data.length.should.be.equal(0);
                done();
            });
    });

    it("201 Not able to create new document", (done) => {
        let doc = {
            description: "Testy test test",
        };

        chai.request(server)
            .post("/docs/create")
            .send(doc)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.an("object");
                res.body.should.have.property("errors");
                res.body.errors.should.have.property("message");
                res.body.errors.message.should.equal(
                    "No document was added, please try again."
                );

                done();
            });
    });
    it("200 HAPPY PATH", (done) => {
        chai.request(server)
            .get("/docs")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.data.should.be.an("array");
                // res.body.data.length.should.be.equal(0);
                done();
            });
    });
});
