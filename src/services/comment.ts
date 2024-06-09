import { z } from 'zod';
import { commentSchema } from '../zod/commentSchema';
import { prismaClient } from '../lib/db';

export type commentSchemaType = z.infer<typeof commentSchema>

class CommentService {

    private static findPost(postId: string) {
        return prismaClient.post.findUnique({
            where: {
                id: postId
            }
        })
    }

    public static async addComment(commentPayload: commentSchemaType) {
        try {
            let res = commentSchema.safeParse(commentPayload);
            if (!res.success) {
                throw new Error(res.error.issues[0].message);
            }

            if (res.success) {
                const { content, postId, userId } = res.data;
                let post = await this.findPost(postId);
                if (post && post.id === postId) {
                    return prismaClient.comments.create({
                        data: {
                            content,
                            postId,
                            userId
                        }
                    })
                } else {
                    throw new Error('Post not found')
                }
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }



}

export default CommentService