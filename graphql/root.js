const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
} = require("graphql");

const DocType = require("./docs.js");

const docModel = require("../models/docs");

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        documents: {
            type: new GraphQLList(DocType),
            description: "List of all documents",
            resolve: async function () {
                const allDocs = await docModel.getAllDocs();

                return allDocs;
            },
        },
    }),
});

module.exports = RootQueryType;
