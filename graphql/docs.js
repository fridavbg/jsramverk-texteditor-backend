const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} = require("graphql");

const CommentType = require("./comments");

const DocType = new GraphQLObjectType({
    name: "Document",
    description: "This represents a document",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        comments: { type: new GraphQLList(CommentType) },
    }),
});

module.exports = DocType;
