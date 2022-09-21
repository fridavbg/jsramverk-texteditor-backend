const database = require("../db/database");
const initDocs = require("../data/docs.json");
const { ObjectId } = require("mongodb");

const docs = {
    getAllDocs: async function getAllDocs() {
        let db = await database.getDb();

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
        let db = await database.getDb();

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
    updateDoc: async function updateDoc(id, doc) {
        let db;

        const filter = { _id: ObjectId(id) };

        const updateDoc = {
            $set: {
                title: `${doc.title}`,
                description: `${doc.description}`,
            },
        };

        try {
            db = await database.getDb();

            const result = await db.collection.updateOne(filter, updateDoc);

            return result.json();
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
