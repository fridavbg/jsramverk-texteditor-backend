const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = require("graphql");

const DocType = require("./docs.js");
const UserType = require("./users.js");

const docModel = require("../models/docs");
const userModel = require("../models/users");

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        document: {
            type: DocType,
            description: "One document by _id",
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async function (parent, args) {
                const document = await docModel.getOneDoc(args._id);

                console.log("Root:", document);

                return document;
            },
        },
        documents: {
            type: new GraphQLList(DocType),
            description: "List of all documents",
            resolve: async function () {
                const allDocs = await docModel.getAllDocs();

                return allDocs;
            },
        },
        users: {
            type: new GraphQLList(UserType),
            description: "List of all users",
            resolve: async function () {
                const allUsers = await userModel.getAllUsers();

                return allUsers;
            },
        },
    }),
});

module.exports = RootQueryType;
