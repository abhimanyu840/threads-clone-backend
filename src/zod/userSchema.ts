import { z } from 'zod';

export const userSchema = z.object({
    firstName: z.string().max(100, { message: 'First name must be smaller than 100 characters' }),
    lastName: z.string().max(100, { message: 'Last name must be smaller than 100 characters' }).optional(),
    email: z.string().email({ message: 'Invalid email' }).max(100, { message: 'Email must be smaller than 100 characters' }),
    password: z.string().min(8, { message: 'Password must be of 8 characters' }).max(100, { message: 'Password must be smaller than 100 characters' }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: 'Please Enter a strong password' }),
})
