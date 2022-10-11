const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const DocType = new GraphQLObjectType({
    name: "Document",
    description: "This represents a document",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
    }),
});

module.exports = DocType;
