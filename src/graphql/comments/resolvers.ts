import CommentService from "../../services/comment";

const queries = {
    // getCommentByPostId: async (postId: string) => {
    //     const comments = await CommentService.getCommentsByPostId(postId);
    //     return comments;
    // }
};

const mutations = {
    addComment: async (_: any, payload: any, context: any) => {
        const { postId, content } = payload;
        if (context && context.user.id) {
            const newComment = await CommentService.addComment({
                content,
                postId,
                userId: context.user.id
            });
            return newComment;
        }
    }
};

export const resolvers = { queries, mutations }
