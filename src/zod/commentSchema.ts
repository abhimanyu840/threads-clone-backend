import { z } from 'zod';

export const commentSchema = z.object({
    content: z.string().min(1, { message: 'Must be of minimum one characters' }).max(200, { message: 'Must be smaller than 200 characters' }),
    postId: z.string().min(1, { message: 'Must be of minimum one characters' }).max(200, { message: 'Must be smaller than 200 characters' }),
    userId: z.string().min(1, { message: 'Must be of minimum one characters' }).max(200, { message: 'Must be smaller than 200 characters' }),
})