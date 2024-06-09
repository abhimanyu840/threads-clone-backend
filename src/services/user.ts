import { z } from "zod";
import { userSchema } from "../zod/userSchema";
import { prismaClient } from "../lib/db";
import bcrypt from 'bcryptjs';
import JWT from "jsonwebtoken";

export type CreateUserPayload = z.infer<typeof userSchema>;

export interface GetUserTokenPayload {
    email: string;
    password: string;
}

export interface UpdateUserPayload {

}

class UserService {

    public static getUserByID(id: string) {
        return prismaClient.user.findUnique({ where: { id } });
    }

    public static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({ where: { email } });
    }

    public static createUser(user: CreateUserPayload) {
        try {
            let res = userSchema.safeParse(user)
            if (!res.success) {
                throw new Error(res.error.message)
            }
            if (res.success) {
                const { firstName, lastName, email, password } = res.data;

                const hashedPassword = bcrypt.hashSync(password, 10);

                return prismaClient.user.create({
                    data: {
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword,
                    },
                });
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload;
        try {

            const user = await this.getUserByEmail(email);
            if (user) {
                const isValid = await bcrypt.compare(password, user.password);
                if (isValid) {
                    const token = JWT.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!);
                    return token;
                }
            } else {
                throw new Error("Invalid Credentials");
            }
        } catch (error) {
            console.error(error, 'Oops! Some error occurred')
        }
    }

    public static decodeJWTToken(token: string | any) {
        try {
            const decoded = JWT.verify(token, process.env.JWT_SECRET!);
            return decoded;
        } catch (error) {
            console.error(error, 'Invalid token');
            return null;
        }
    }

    // public static updateUser(payload: UpdateUserPayload) {
    // }

    // public static deleteUser(email: string) {
    // }

}

export default UserService