const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const DocType = new GraphQLObjectType({
    name: "Document",
    description: "This represents a document",
    fields: () => ({
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
    }),
});

module.exports = DocType;
