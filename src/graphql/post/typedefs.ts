export const typeDefs = `#graphql
    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
        image: String
        createdAt: String!
        likedBy: [User!]!   # Ensure this is non-nullable and returns an empty array if no likes
        repostedBy: [User!]!   # Ensure this is non-nullable and returns an empty array if no reposts
        comments: [Comment!]!
},
`