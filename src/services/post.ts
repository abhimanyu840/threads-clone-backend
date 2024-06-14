// services/post.ts

import { z } from "zod";
import { prismaClient } from "../lib/db";
import { postSchema } from "../zod/postSchema";
import redisClient from "../redisClient";

export type CreatePostPayload = z.infer<typeof postSchema>

class PostService {

    public static async createPost(payload: CreatePostPayload) {
        try {
            let res = postSchema.safeParse(payload);
            if (!res.success) {
                throw new Error(res.error.message)
            }
            if (res.success) {

                const { title, authorId, content, image } = res.data;
                await redisClient.del(`posts`)
                return prismaClient.post.create({
                    data: {
                        title,
                        content,
                        image,
                        author: {
                            connect: { id: authorId }
                        },
                    },
                    include: {
                        author: true,
                        likedBy: true,
                        repostedBy: true
                    }
                });
            }
        } catch (error) {
            throw new Error("Oops! Some error occurred")
        }
    }

    public static async getPosts() {
        const cachedPost = await redisClient.get(`posts`);
        if (cachedPost) return JSON.parse(cachedPost);
        let fetchedPost = await prismaClient.post.findMany({
            include: {
                author: true,
                likedBy: true,
                repostedBy: true,
                Comments: true
            }
        });
        await redisClient.set(`posts`, JSON.stringify(fetchedPost));
        return fetchedPost;
    }

    private static async findPost(postId: string) {
        const cache = await redisClient.get(`posts`);
        const cachedPost = cache && await JSON.parse(cache);
        const thisPost = cachedPost.id === postId;
        if (thisPost) return thisPost;
        return prismaClient.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true,
                likedBy: true,
                repostedBy: true
            }
        });
    }

    public static async addLike(postId: string, userId: string) {
        let post = await this.findPost(postId);

        if (post) {
            await redisClient.del(`posts`)
            return prismaClient.post.update({
                where: { id: postId },
                data: {
                    likedBy: {
                        connect: { id: userId }
                    }
                },
                include: {
                    author: true,
                    likedBy: true,
                    repostedBy: true
                }
            });
        } else {
            throw new Error("Post not found")
        }
    }

    public static async repost(postId: string, userId: string) {
        let post = await this.findPost(postId);
        if (post) {
            return prismaClient.post.update({
                where: { id: postId },
                data: {
                    repostedBy: {
                        connect: { id: userId }
                    }
                },
                include: {
                    author: true,
                    likedBy: true,
                    repostedBy: true
                }
            });
        } else {
            throw new Error("Post not found")
        }
    }

    public static async getPostByAuthorId(id: string) {
        const cache = await redisClient.get(`posts`);
        const cachedPost = cache && await JSON.parse(cache);
        const thisPost = cachedPost.authorId === id;
        if (thisPost) return thisPost;
        return prismaClient.post.findMany({
            where: { authorId: id },
            include: {
                author: true,
                likedBy: true,
                repostedBy: true
            }
        })
    }

}

export default PostService;
