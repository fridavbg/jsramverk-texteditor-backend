process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app.js");

chai.should();

chai.use(chaiHttp);

const database = require("../db/database.js");
const collectionName = "crowd";

describe("document_data", () => {
    before(() => {
        return new Promise(async (resolve) => {
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
                    resolve();
                });
        });
    });

    console.log("here");
});
