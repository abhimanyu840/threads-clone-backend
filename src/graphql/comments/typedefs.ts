export const typeDefs = `#graphql
type Comment  {
    id:ID!
    content:String!
    post:Post!
    postId:String!
    user:User!
    userId:String!
},
`