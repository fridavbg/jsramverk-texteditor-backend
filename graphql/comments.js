const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");

const CommentType = new GraphQLObjectType({
    name: "Comment",
    description: "This represents a comment",
    fields: () => ({
        user: { type: GraphQLString },
        comment: { type: GraphQLString },
        range: {
            type: new GraphQLObjectType({
                name: "Range",
                description: "This represents a comment range",
                fields: () => ({
                    index: { type: GraphQLInt },
                    length: { type: GraphQLInt },
                }),
            }),
        },
    }),
});

module.exports = CommentType;
