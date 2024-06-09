import { z } from 'zod';

export const postSchema = z.object({
    title: z.string().min(1, { message: 'Title must be of length 1' }).max(200, { message: 'Title must be less than 200 characters.' }),
    content: z.string().min(1, { message: 'Content must be of length 1' }).max(1000, { message: 'Content must be less than 1000 characters.' }),
    authorId: z.string().min(1, { message: 'Author must be of length 1' }).max(200, { message: 'Author must be less than 200 characters.' }),
    image: z.string().min(1, { message: 'Image must be of length 1' }).max(200, { message: 'Image must be less than 200 characters.' }).optional(),
})