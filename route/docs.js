var express = require("express");
var router = express.Router();

const docModel = require("../models/docs");
const usersModel = require("../models/users");

router.get(
    "/",
    (req, res, next) => usersModel.checkToken(req, res, next),
    async (req, res) => {
        const docs = await docModel.getAllDocs();

        return res.json({
            data: docs,
        });
    }
);

router.post("/create", async (req, res) => {
    const newDoc = {
        title: req.body.title,
        description: req.body.description,
        comments: [],
    };

    // console.log(newDoc);
    if (newDoc.title && newDoc.description) {
        const result = await docModel.insertDoc(newDoc);

        res.status(201).json({ data: result });
    } else {
        return res.status(400).json({
            errors: {
                message: "No document was added, please try again.",
            },
        });
    }
});

router.get("/edit/(:id)", async (req, res) => {
    const result = await docModel.getOneDoc(req.params.id);

    res.status(201).json({ data: result });
});

router.post("/edit/(:id)", async (req, res) => {
    const updateDoc = req.body;

    if (updateDoc.title && updateDoc.description) {
        const result = await docModel.updateDoc(req.params.id, updateDoc);

        res.status(201).json({ data: result });
    } else {
        return res.status(400).json({
            errors: {
                message: "No document was updated, please try again.",
            },
        });
    }
});

// eslint-disable-next-line no-unused-vars
router.delete("/delete/(:id)", async (req, _res) => {
    console.log(req.params.id);
});

router.post("/init", async (req, res) => {
    await docModel.init();

    res.send("Added some docs to the database");
});

module.exports = router;
