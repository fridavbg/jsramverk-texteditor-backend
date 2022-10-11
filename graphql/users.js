const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const UserType = new GraphQLObjectType({
    name: "Document",
    description: "This represents a document",
    fields: () => ({
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
    }),
});

module.exports = UserType;
