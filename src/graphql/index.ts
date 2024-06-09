import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Post } from "./post";
import { Comment } from "./comments";

async function createApolloGraphqlServer() {
    //Create GraphQl Server
    const gqlServer = new ApolloServer({
        typeDefs: `
                ${User.typeDefs}
                ${Post.typeDefs}
                ${Comment.typeDefs}
                type Query {
                    ${User.queries}
                    ${Post.queries}
                }
                
                type Mutation{
                    ${User.mutations}
                    ${Post.mutations}
                    ${Comment.mutations}
                }
                `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Post.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Post.resolvers.mutations,
                ...Comment.resolvers.mutations
            }
        }
    });
    // Note you must call `start()` on the `ApolloServer`
    // instance before passing the instance to `expressMiddleware`
    await gqlServer.start();
    return gqlServer;

}

export default createApolloGraphqlServer;