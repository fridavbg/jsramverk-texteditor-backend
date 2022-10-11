const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const DocType = new GraphQLObjectType({
    name: "Document",
    description: "This represents a document",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
    }),
});

module.exports = DocType;
