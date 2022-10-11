const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require("graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    description: "This represents a user",
    fields: () => ({
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
    }),
});

module.exports = UserType;
