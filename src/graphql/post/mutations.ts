export const mutations = `#graphql
    # createPost(title:String!,content:String!,image:String):String
    # createPost(title:String!,content:String!,image:String):Post!
    # addLike(postId:String!):String
    createPost(title: String!, content: String!, image: String): Post!
    updatePost(id: ID!, title: String, content: String, image: String): Post!
    deletePost(id: ID!): Post!
    addLike(postId: String!, userId: String!): Post!
    repost(postId: String!, userId: String!): Post!
`