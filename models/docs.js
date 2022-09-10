const database = require("../db/database");
const initDocs = require("../data/docs.json");
const { ObjectId } = require("mongodb");

const docs = {
    getAllDocs: async function getAllDocs() {
        let db;

        try {
            db = await database.getDb();

            const allDocs = await db.collection.find().toArray();

            return allDocs;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                },
            };
        } finally {
            await db.client.close();
        }
    },
    getOneDoc: async function getOneDoc(id) {
        let db;
        try {
            db = await database.getDb();
            console.log("ID: " + id);

            const docById = await db.collection
                .find({
                    _id: ObjectId(id),
                })
                .toArray();

            console.log("Doc: " + docById);

            return docById;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                },
            };
        } finally {
            await db.client.close();
        }
    },
    insertDoc: async function insertDoc(newDoc) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertOne(newDoc);

            return {
                ...newDoc,
                _id: result.insertedId,
            };
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    updateDoc: async function updateDoc(id) {
        let db;

        try {
            console.log("update");

            // db = await database.getDb(id);

            // const filter = { _id: id };

            // const updateDoc = {
            //     $set: {
            //         title: `${title}`,
            //         description: `${description}`,
            //     },
            // };
            // const result = await db.collection.updateOne(filter, updateDoc);

            // console.log(
            //     `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
            // );
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    init: async function init() {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertMany(initDocs);

            console.log(`${result.insertedCount} documents were inserted`);
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
};
module.exports = docs;
