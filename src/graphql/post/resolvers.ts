// src/graphql/resolvers.ts

import PostService from "../../services/post";

const queries = {
    allPosts: async () => {
        const posts = await PostService.getPosts();
        return posts.map(post => ({
            ...post,
            createdAt: post.createdAt.toISOString(),
            likedBy: post.likedBy || [],
            repostedBy: post.repostedBy || [],
            comments: post.Comments || []  // Ensure comments is never null
        }));
    },
    post: async (_: any, { id }: { id: string }) => {
        const post = await PostService.getPostById(id);
        // return {
        //     ...post,
        //     createdAt: post!.createdAt.toISOString(),
        //     likedBy: post!.likedBy || [],
        //     repostedBy: post!.repostedBy || []
        // };
        return post;
    }
};

const mutations = {
    createPost: async (_: any, payload: any, context: any) => {
        const { content, title, image } = payload;
        try {
            if (context && context.user && context.user.id) {
                const post = await PostService.createPost({
                    content,
                    title,
                    image,
                    authorId: context.user.id
                });
                return {
                    ...post,
                    createdAt: post!.createdAt.toISOString(),
                    likedBy: post!.likedBy || [],
                    repostedBy: post!.repostedBy || []
                };
            } else {
                throw new Error("Unauthorized");
            }
        } catch (error) {
            throw new Error("Oops! Some error occurred");
        }
    },
    addLike: async (_: any, { postId, userId }: any) => {
        try {
            const post = await PostService.addLike(postId, userId);
            return {
                ...post,
                createdAt: post.createdAt.toISOString(),
                likedBy: post.likedBy || [],
                repostedBy: post.repostedBy || []
            };
        } catch (error) {
            throw new Error("Oops! Some error occurred");
        }
    },
    repost: async (_: any, { postId, userId }: any) => {
        try {
            const post = await PostService.repost(postId, userId);
            return {
                ...post,
                createdAt: post.createdAt.toISOString(),
                likedBy: post.likedBy || [],
                repostedBy: post.repostedBy || []
            };
        } catch (error) {
            throw new Error("Oops! Some error occurred");
        }
    }
};

export const resolvers = { queries, mutations };
