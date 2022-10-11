const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const DocType = new GraphQLObjectType({
    name: "Document",
    description: "This represents a document",
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLString),
        },
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
    }),
});

module.exports = DocType;
